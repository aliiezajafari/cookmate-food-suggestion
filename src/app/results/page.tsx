'use client'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { supabase } from '../../../lib/supabaseClient';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

type Recipe = {
  id: number
  name: string
  slug: string
  image?: string | null
  cook_time?: number | null
  calories?: number | null
  servings?: number | null
  ingredients?: any
  steps?: any
  protein?: number | null
  carbs?: number | null
  fat?: number | null
  fiber?: number | null
  sugar?: number | null
  notes?: string | null
}

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const queryIngredients = searchParams.get('ingredients') || '';
  // const selectedIngredients = queryIngredients.split(',').map(i=>i.trim().toLowerCase()).filter(Boolean);
  const selectedIngredients = queryIngredients.split(',').map(s => s.trim()).filter(Boolean);
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);

      const { data, error } = await supabase.from("recipes").select("*");

      if (error) {
        console.error("❌ Error fetching recipes:", error);
        setLoading(false);
        return;
      }

      if (!queryIngredients) {
        setRecipes(data);
        setLoading(false);
        return;
      }

      const selectedIngredients = queryIngredients
        .split(",")
        .map((item) => item.trim().toLowerCase());

      console.log("🔍 selectedIngredients:", selectedIngredients);

      const filtered = data.filter((recipe) => {
        if (!recipe.ingredients) return false;
        return selectedIngredients.every((ing) =>
          JSON.stringify(recipe.ingredients).toLowerCase().includes(ing)
        );
      });

      setRecipes(filtered);
      setLoading(false);
    }

    fetchRecipes();
  }, [queryIngredients]);



  return (
    <>
    <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image 
              src="/Screenshot 2025-10-02 at 19-05-52 Free Logo Maker - Get Custom Logo Designs in Minutes Looka.png"
              alt="logo"
              width={125}
              height={125} />
          </div>
          <nav className={styles.nav}>
            <a href="/">Home</a>
            <a href="#">Saved Recipes</a>
            <a href="#">About</a>
          </nav>
          <button onClick={() => setOpen(!open)} className={styles.menuButton}>☰</button>
        </div>
        {open && (
        <div className="absolute left-0 w-full bg-white border-t shadow-lg animate-slide-down">
          <div className="flex justify-around items-center py-4 text-gray-800 font-medium">
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-blue-600">Home</Link>
            <Link href="#" onClick={() => setOpen(false)} className="hover:text-blue-600">Saved Recipes</Link>
            <Link href="#" onClick={() => setOpen(false)} className="hover:text-blue-600">About</Link>
          </div>
        </div>
      )}
      </header>


    <main className="py-8">
      <div className="container mx-auto px-4">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          

          <div className="mt-2 md:mt-0 flex items-center gap-3">
            
            <h2 className="text-3xl font-bold mb-6">
            {selectedIngredients.length > 0
              ? `Results for: ${selectedIngredients.join(', ')}`
              : 'All recipes'}
          </h2>
          </div>
        </header>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20 text-gray-600">not found</div>
        ) : (
          <>
            <div style={{margin:'10px'}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe:any) => (
                <article
                  key={recipe.id}
                  className="recipe-card bg-white rounded-xl overflow-hidden shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="w-full h-48 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${recipe.image ?? '/default.jpg'})`,
                    }}
                    role="img"
                    aria-label={recipe.name}
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{recipe.name}</h3>
                      <button
                      style={{marginTop:'10px',marginRight:'10px'}}
                        type="button"
                        className="text-gray-400 hover:text-rose-500 transition"
                        aria-label="toggle favorite"
                        onClick={() => {
                          
                          const btn = (event?.currentTarget as HTMLButtonElement)
                          btn.classList.toggle('text-rose-500')
                        }}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
                      </button>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
                      <div className="flex items-center gap-1">
                        <span>🕐{recipe.cook_time} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>🔥{recipe.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{recipe.servings} servings</span>
                      </div>
                    </div>

                    {/* tags from ingredients: show up to 3 keywords if ingredients is jsonb array
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(() => {
                        try {
                          const ing = recipe.ingredients ?? []
                          // if ingredients is stringified JSON, parse it
                          const arr = typeof ing === 'string' ? JSON.parse(ing) : ing
                          // try to extract a short list of keywords (first words of first 3 items)
                          const tags = Array.isArray(arr)
                            ? arr.slice(0, 3).map((it: any) => {
                                if (typeof it === 'string') return it.split(' ')[0]
                                return (it.text || it).toString().split(' ')[0]
                              })
                            : []
                          return tags.map((t: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {t}
                            </span>
                          ))
                        } catch {
                          return null
                        }
                      })()}
                    </div> */}

                    <Link href={`/recipes/${recipe.slug}`} >
                      <button style={{marginTop:'15px'}} className="w-full bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition">
                        View Recipe
                      </button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button
              style={{marginBottom:'10px',marginTop:'10px',paddingTop:'6px',paddingLeft:'15px',paddingRight:'15px',paddingBottom:'6px'}}
                className="bg-white hover:bg-gray-50 text-rose-500 border border-rose-500 px-6 py-2 rounded-lg font-medium transition"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Load More Recipes
              </button>
            </div>
          </>
        )}
      </div>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div>
              <h3>CookMate</h3>
              <p>Discover delicious recipes based on what you already have in your kitchen.</p>
            </div>
            <div>
              <h4>Navigation</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="/results">Search Recipes</a></li>
                <li><a href="/recipes">Saved Recipes</a></li>
                <li><a href="#">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4>Connect</h4>
              <div className={styles.socialLinks}>
                <a href="#"></a>
                <a href="#"></a>
                <a href="#"></a>
                <a href="#"></a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2025 CookMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
    </>
  )
}
<SpeedInsights/>