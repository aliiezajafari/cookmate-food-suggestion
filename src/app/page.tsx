'use client';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from "next/link";
import Image from "next/image";
import { useEffect,useState,useRef } from 'react';
import styles from './page.module.css';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([])
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);


  const allIngredients = [
    "egg","egg yolk","egg white","milk","cheese","tomato","potato","onion","garlic","chicken","fish","rice","butter","flour","oil","salt","sugar","carrot","apple",
  ];

  const handleSearch = () => {
  if (selectedIngredients.length === 0) return;
  const query = selectedIngredients.join(",");
  router.push(`/results?ingredients=${encodeURIComponent(query)}`);
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setSelectedIngredients([...selectedIngredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeIngredient = (index: number) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  const addPopularIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const popularIngredients = [
    { name: 'Eggs', icon: '🥚' },
    { name: 'Milk', icon: '🥛' },
    { name: 'Carrot', icon: '🥕' },
    { name: 'Chicken', icon: '🍗' },
    { name: 'Fish', icon: '🐟' },
    { name: 'Apple', icon: '🍎' }
  ];

  useEffect(() => {
  const fetchData = async () => {
    const { data, error } = await supabase
    .from('recipes')
    .select('*')
    
    if (error) {
    } else if (data) {
      const shuffled = data.sort(() => 0.5 - Math.random());
      setRecipes(shuffled.slice(0, 3));
    }
  };
  fetchData();
}, []);



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
            <Link href="/">Home</Link>
            <Link href="#">Saved Recipes</Link>
            <Link href="#">About</Link>
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

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>What's in your fridge today?</h1>
            <p>Discover delicious recipes based on the ingredients you already have</p>
            
            <div className={styles.searchCard}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInputWrapper}>
                  <span className={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search for ingredients..."
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      const filtered = allIngredients.filter(item =>
                        item.toLowerCase().includes(e.target.value.toLowerCase())
                      ); 
                      setSuggestions(e.target.value ? filtered.slice(0, 5) : []); 
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  
                </div>
                <div className={styles.selectedIngredients}>
                  {selectedIngredients.map((ingredient, index) => (
                    <div key={index} className={styles.selectedChip}>
                      {ingredient}
                      <button onClick={() => removeIngredient(index)}>×</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.searchFooter}>
                <div className={styles.filters}>
                  <div className={styles.filterGroup}>
                    <span className={styles.filterIcon}>🕐</span>
                    <select>
                      <option>Any time</option>
                      <option>Under 15 min</option>
                      <option>15-30 min</option>
                      <option>30-60 min</option>
                    </select>
                  </div>
                  <div className={styles.filterGroup}>
                    <span className={styles.filterIcon}>🔥</span>
                    <select>
                      <option>Any calories</option>
                      <option>Under 300</option>
                      <option>300-600</option>
                      <option>600+</option>
                    </select>
                  </div>
                </div>
                <button className={styles.findButton} onClick={handleSearch}>Find Recipes</button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.popularSection}>
          <div className={styles.container}>
            <h2>Popular Ingredients</h2>
            <div className={styles.chipGrid}>
              {popularIngredients.map((item, index) => (
                <button
                  key={index}
                  className={styles.chip}
                  onClick={() => addPopularIngredient(item.name)}
                >
                  <span>{item.icon}</span> {item.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.recipesSection}>
          <div className={styles.container}>
            <h2>Recently Added Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recipes.map((r) => (
            <Link
              key={r.id}
              href={`/recipes/${r.slug}`} 
              className="block bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <img src={r.image} alt={r.name} className="w-full h-40 object-cover rounded-lg mb-2" />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{r.name}</h2>
              <p className="text-sm text-gray-500">⏱ Cook Time : {r.cook_time} Minutes</p>
              <p className="text-sm text-gray-500">🔥 Calories: {r.calories}</p>
              <p className="text-sm text-gray-500">👨‍👩‍👧‍👦 Serving for {r.servings} persons</p>
            </Link>
            ))}
          </div>
            <Link href="/results">
            <button style={{marginLeft:'73px'}} className={styles.allButton}>View all Recipes</button>
            </Link>
          </div>
        </section>
      </main>

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
                <li><a href="/">Search Recipes</a></li>
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
    </>
  );
}
<SpeedInsights/>