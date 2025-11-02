// 'use client'
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect,useState } from 'react';
// import Head from 'next/head';
// import { supabase } from '../../../lib/supabaseClient'


// export default function RecipePage() {
//   const [recipes, setRecipes] = useState<any[]>([])
//   const [checkedIngredients, setCheckedIngredients] = useState<{[key: string]: boolean}>({});
//   const [isFavorite, setIsFavorite] = useState(false);

//   const toggleIngredient = (id: string) => {
//     setCheckedIngredients(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };
  
//   useEffect(() => {
//       const fetchData = async () => {
//         const { data, error } = await supabase.from('recipes').select('10003')
//         if (error) console.error('Error fetching recipes:', error)
//         else setRecipes(data)
//       }
//       fetchData()
//     }, [])

//   const ingredients = [
//     { id: '1', text: '1 cup rice (white or brown)' },
//     { id: '2', text: '2 boneless, skinless chicken breasts' },
//     { id: '3', text: '2 cups broccoli florets' },
//     { id: '4', text: '1 bell pepper, diced' },
//     { id: '5', text: '2 tbsp olive oil, divided' },
//     { id: '6', text: '3 tbsp soy sauce' },
//     { id: '7', text: '1 tbsp honey' },
//     { id: '8', text: '1 tsp sesame oil' },
//     { id: '9', text: '1 garlic clove, minced' },
//     { id: '10', text: 'Salt and pepper to taste' }
//   ];

//   const relatedRecipes = [
//     { title: 'Teriyaki Chicken', time: '35 min', calories: '520 cal', img: 'http://static.photos/food/640x360/207' },
//     { title: 'Rice Noodle Bowl', time: '20 min', calories: '380 cal', img: 'http://static.photos/food/640x360/208' },
//     { title: 'Broccoli Stir Fry', time: '25 min', calories: '420 cal', img: 'http://static.photos/food/640x360/209' }
//   ];

//   return (
//     <>
//       <Head>
//         <title>Recipe | CookMate</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
//       </Head>

//       <div className="page-container">
//         <header className="header">
//           <div className="header-container">
//             <div className="logo-section">
//               <Image 
//                 src="/Screenshot 2025-10-02 at 19-05-52 Free Logo Maker - Get Custom Logo Designs in Minutes Looka.png"
//                 alt="logo"
//                 width={125}
//                 height={125} />
//             </div>
//             <nav className="nav-desktop">
//               <a href="#" className="nav-link">Home</a>
//               <a href="#" className="nav-link">Saved Recipes</a>
//               <a href="#" className="nav-link">About</a>
//             </nav>
//             <button className="menu-btn">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <line x1="3" y1="12" x2="21" y2="12"></line>
//                 <line x1="3" y1="6" x2="21" y2="6"></line>
//                 <line x1="3" y1="18" x2="21" y2="18"></line>
//               </svg>
//             </button>
//           </div>
//         </header>

//         <main>
//           <section className="hero-section">
//             <div className="hero-container">
//               <div className="hero-content">
//                 <div className="hero-header">
//                   <div>
//                     <span className="time-badge">30 min</span>
//                     <h1 className="hero-title">Chicken & Rice Bowl</h1>
//                     <div className="hero-meta">
//                       <div className="meta-item">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <circle cx="12" cy="12" r="10"></circle>
//                           <polyline points="12 6 12 12 16 14"></polyline>
//                         </svg>
//                         <span>30 min</span>
//                       </div>
//                       <div className="meta-item">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//                         </svg>
//                         <span>480 calories</span>
//                       </div>
//                       <div className="meta-item">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                           <circle cx="9" cy="7" r="4"></circle>
//                           <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                           <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                         </svg>
//                         <span>2 servings</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button 
//                     className="fav-btn"
//                     onClick={() => setIsFavorite(!isFavorite)}
//                   >
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "white" : "none"} stroke="white" strokeWidth="2">
//                       <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </section>

//           <section className="content-section">
            // <div className="content-container">
            //   <div className="content-layout">
            //     <div className="main-content">
            //       <div className="card instructions-card">
            //         <h2 className="section-title">Instructions</h2>
            //         <div className="steps-container">
            //           <div className="step">
            //             <div className="step-number">1</div>
            //             <div>
            //               <h3 className="step-title">Cook the rice</h3>
            //               <p className="step-text">Rinse 1 cup of rice under cold water until the water runs clear. Cook according to package instructions.</p>
            //             </div>
            //           </div>
            //           <div className="step">
            //             <div className="step-number">2</div>
            //             <div>
            //               <h3 className="step-title">Prepare the chicken</h3>
            //               <p className="step-text">Season 2 chicken breasts with salt, pepper, and 1 tsp garlic powder. Heat 1 tbsp olive oil in a pan over medium heat and cook chicken for 6-7 minutes per side until cooked through. Let rest for 5 minutes, then slice.</p>
            //             </div>
            //           </div>
            //           <div className="step">
            //             <div className="step-number">3</div>
            //             <div>
            //               <h3 className="step-title">Cook the vegetables</h3>
            //               <p className="step-text">In the same pan, add 1 tbsp olive oil and sauté 2 cups of broccoli florets and 1 diced bell pepper for 4-5 minutes until tender-crisp. Season with salt and pepper.</p>
            //             </div>
            //           </div>
            //           <div className="step">
            //             <div className="step-number">4</div>
            //             <div>
            //               <h3 className="step-title">Make the sauce</h3>
            //               <p className="step-text">Whisk together 3 tbsp soy sauce, 1 tbsp honey, 1 tsp sesame oil, and 1 minced garlic clove in a small bowl.</p>
            //             </div>
            //           </div>
            //           <div className="step">
            //             <div className="step-number">5</div>
            //             <div>
            //               <h3 className="step-title">Assemble the bowls</h3>
            //               <p className="step-text">Divide the rice between two bowls. Top with sliced chicken and vegetables. Drizzle with sauce and garnish with sesame seeds and chopped green onions if desired.</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>

//                   <div className="card notes-card">
//                     <h2 className="section-title">Notes</h2>
//                     <p className="note-text">This recipe is very versatile - feel free to substitute any vegetables you have on hand. Zucchini, carrots, or snap peas would all work well.</p>
//                     <p className="note-text">For extra flavor, marinate the chicken in half of the sauce for 30 minutes before cooking.</p>
//                   </div>
//                 </div>

//                 <div className="sidebar">
//                   <div className="card sidebar-card">
//                     <h2 className="section-title">Ingredients</h2>
//                     <div className="ingredients-list">
//                       {ingredients.map((ingredient) => (
//                         <div key={ingredient.id} className="ingredient-item">
//                           <input
//                             type="checkbox"
//                             id={`ingredient${ingredient.id}`}
//                             className="ingredient-checkbox"
//                             checked={checkedIngredients[ingredient.id] || false}
//                             onChange={() => toggleIngredient(ingredient.id)}
//                           />
//                           <label
//                             htmlFor={`ingredient${ingredient.id}`}
//                             className={`ingredient-label ${checkedIngredients[ingredient.id] ? 'checked' : ''}`}
//                           >
//                             {ingredient.text}
//                           </label>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="nutrition-section">
//                       <h3 className="nutrition-title">Nutrition Information</h3>
//                       <div className="nutrition-grid">
//                         <div className="nutrition-item">
//                           <div className="nutrition-label">Calories</div>
//                           <div>480</div>
//                         </div>
//                         <div className="nutrition-item">
//                           <div className="nutrition-label">Protein</div>
//                           <div>38g</div>
//                         </div>
//                         <div className="nutrition-item">
//                           <div className="nutrition-label">Carbs</div>
//                           <div>52g</div>
//                         </div>
//                         <div className="nutrition-item">
//                           <div className="nutrition-label">Fat</div>
//                           <div>12g</div>
//                         </div>
//                         <div className="nutrition-item">
//                           <div className="nutrition-label">Fiber</div>
//                           <div>6g</div>
//                         </div>
//                         <div className="nutrition-item">
//                           <div className="nutrition-label">Sugar</div>
//                           <div>8g</div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="action-buttons">
//                       <button className="btn-primary">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <polyline points="6 9 6 2 18 2 18 9"></polyline>
//                           <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
//                           <rect x="6" y="14" width="12" height="8"></rect>
//                         </svg>
//                         Print
//                       </button>
//                       <button className="btn-secondary">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <circle cx="18" cy="5" r="3"></circle>
//                           <circle cx="6" cy="12" r="3"></circle>
//                           <circle cx="18" cy="19" r="3"></circle>
//                           <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
//                           <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
//                         </svg>
//                         Share
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

        //   <section className="related-section">
        //     <div className="related-container">
        //       <h2 className="related-title">You Might Also Like</h2>
        //       <div className="related-grid">
        //         {relatedRecipes.map((recipe, index) => (
        //           <div key={index} className="recipe-card">
        //             <img src={recipe.img} alt={recipe.title} className="recipe-img" />
        //             <div className="recipe-card-content">
        //               <h3 className="recipe-card-title">{recipe.title}</h3>
        //               <div className="recipe-card-meta">
        //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        //                   <circle cx="12" cy="12" r="10"></circle>
        //                   <polyline points="12 6 12 12 16 14"></polyline>
        //                 </svg>
        //                 <span className="recipe-meta-text">{recipe.time}</span>
        //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        //                   <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        //                 </svg>
        //                 <span className="recipe-meta-text">{recipe.calories}</span>
        //               </div>
        //               <button className="view-recipe-btn">
        //                 View Recipe
        //                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        //                   <line x1="5" y1="12" x2="19" y2="12"></line>
        //                   <polyline points="12 5 19 12 12 19"></polyline>
        //                 </svg>
        //               </button>
        //             </div>
        //           </div>
        //         ))}
        //       </div>
        //     </div>
        //   </section>
//         </main>

//         <footer className="footer">
//           <div className="footer-container">
//             <div className="footer-grid">
//               <div>
//                 <h3 className="footer-brand">FoodMatch</h3>
//                 <p className="footer-desc">Discover delicious recipes based on what you already have in your kitchen.</p>
//               </div>
//               <div>
//                 <h4 className="footer-heading">Navigation</h4>
//                 <ul className="footer-list">
//                   <li><a href="#" className="footer-link">Home</a></li>
//                   <li><a href="#" className="footer-link">Search Recipes</a></li>
//                   <li><a href="#" className="footer-link">Saved Recipes</a></li>
//                   <li><a href="#" className="footer-link">About Us</a></li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="footer-heading">Legal</h4>
//                 <ul className="footer-list">
//                   <li><a href="#" className="footer-link">Terms of Service</a></li>
//                   <li><a href="#" className="footer-link">Privacy Policy</a></li>
//                   <li><a href="#" className="footer-link">Cookie Policy</a></li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="footer-heading">Connect</h4>
//                 <div className="social-links">
//                   <a href="#" className="social-link">
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
//                     </svg>
//                   </a>
//                   <a href="#" className="social-link">
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                       <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//                     </svg>
//                   </a>
//                   <a href="#" className="social-link">
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
//                     </svg>
//                   </a>
//                   <a href="#" className="social-link">
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
//                       <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"></polygon>
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="footer-bottom">
//               <p>© 2023 FoodMatch. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>

//         <style jsx>{`
//           .page-container {
//             font-family: 'Inter', sans-serif;
//             background-color: #F7F7F7;
//             color: #333333;
//             margin: 0;
//             padding: 0;
//           }

//           .header {
//             position: sticky;
//             top: 0;
//             z-index: 50;
//             background-color: white;
//             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//           }

//           .header-container {
//             max-width: 1200px;
//             margin: 0 auto;
//             padding: 12px 16px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//           }

//           .logo-section {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//           }

//           .heart-icon {
//             color: #f43f5e;
//           }

//           .logo-text {
//             font-size: 24px;
//             font-weight: 700;
//             color: #1f2937;
//             font-family: 'Poppins', sans-serif;
//             margin: 0;
//           }

//           .nav-desktop {
//             display: none;
//             gap: 24px;
//           }

//           @media (min-width: 768px) {
//             .nav-desktop {
//               display: flex;
//             }
//           }

//           .nav-link {
//             color: #374151;
//             text-decoration: none;
//             transition: color 0.2s;
//           }

//           .nav-link:hover {
//             color: #f43f5e;
//           }

//           .menu-btn {
//             padding: 8px;
//             border-radius: 9999px;
//             background-color: #f3f4f6;
//             border: none;
//             cursor: pointer;
//             transition: background-color 0.2s;
//             display: block;
//           }

//           @media (min-width: 768px) {
//             .menu-btn {
//               display: none;
//             }
//           }

//           .menu-btn:hover {
//             background-color: #e5e7eb;
//           }

//           .hero-section {
//             background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('http://static.photos/food/1200x630/201');
//             background-size: cover;
//             background-position: center;
//             color: white;
//             padding: 64px 0;
//           }

//           @media (min-width: 768px) {
//             .hero-section {
//               padding: 96px 0;
//             }
//           }

//           .hero-container {
//             max-width: 1200px;
//             margin: 0 auto;
//             padding: 0 16px;
//           }

//           .hero-content {
//             max-width: 768px;
//           }

//           .hero-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: flex-start;
//             margin-bottom: 24px;
//           }

//           .time-badge {
//             display: inline-block;
//             background-color: white;
//             color: #f43f5e;
//             padding: 4px 12px;
//             border-radius: 9999px;
//             font-size: 14px;
//             font-weight: 500;
//             margin-bottom: 12px;
//           }

//           .hero-title {
//             font-size: 36px;
//             font-weight: 700;
//             margin: 0 0 16px 0;
//             font-family: 'Poppins', sans-serif;
//           }

//           @media (min-width: 768px) {
//             .hero-title {
//               font-size: 48px;
//             }
//           }

//           .hero-meta {
//             display: flex;
//             align-items: center;
//             gap: 16px;
//           }

//           .meta-item {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//           }

//           .meta-item svg {
//             flex-shrink: 0;
//           }

//           .fav-btn {
//             padding: 12px;
//             background-color: rgba(255, 255, 255, 0.2);
//             border: none;
//             border-radius: 9999px;
//             cursor: pointer;
//             transition: background-color 0.2s;
//           }

//           .fav-btn:hover {
//             background-color: rgba(255, 255, 255, 0.3);
//           }

//           .content-section {
//             padding: 48px 0;
//           }

//           .content-container {
//             max-width: 1200px;
//             margin: 0 auto;
//             padding: 0 16px;
//           }

//           .content-layout {
//             display: flex;
//             flex-direction: column;
//             gap: 48px;
//           }

//           @media (min-width: 1024px) {
//             .content-layout {
//               flex-direction: row;
//             }
//           }

//           .main-content {
//             flex: 1;
//           }

//           @media (min-width: 1024px) {
//             .main-content {
//               width: 66.666667%;
//             }
//           }

//           .sidebar {
//             flex: 1;
//           }

//           @media (min-width: 1024px) {
//             .sidebar {
//               width: 33.333333%;
//             }
//           }

//           .card {
//             background-color: white;
//             border-radius: 12px;
//             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//             padding: 24px;
//           }

//           .instructions-card {
//             margin-bottom: 32px;
//           }

//           .section-title {
//             font-size: 24px;
//             font-weight: 700;
//             margin: 0 0 24px 0;
//             font-family: 'Poppins', sans-serif;
//           }

//           .steps-container {
//             display: flex;
//             flex-direction: column;
//             gap: 24px;
//           }

//           .step {
//             display: flex;
//             gap: 16px;
//           }

//           .step-number {
//             width: 32px;
//             height: 32px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             background-color: #f43f5e;
//             color: white;
//             border-radius: 9999px;
//             font-weight: 700;
//             flex-shrink: 0;
//           }

//           .step-title {
//             font-weight: 600;
//             margin: 0 0 8px 0;
//             font-size: 16px;
//           }

//           .step-text {
//             color: #4b5563;
//             margin: 0;
//             line-height: 1.6;
//           }

//           .note-text {
//             color: #4b5563;
//             margin: 0 0 16px 0;
//             line-height: 1.6;
//           }

//           .note-text:last-child {
//             margin-bottom: 0;
//           }

//           .sidebar-card {
//             position: sticky;
//             top: 96px;
//           }

//           .ingredients-list {
//             display: flex;
//             flex-direction: column;
//             gap: 16px;
//           }

//           .ingredient-item {
//             display: flex;
//             align-items: center;
//           }

//           .ingredient-checkbox {
//             margin-right: 12px;
//             width: 20px;
//             height: 20px;
//             border-radius: 4px;
//             border: 1px solid #d1d5db;
//             cursor: pointer;
//             flex-shrink: 0;
//           }

//           .ingredient-checkbox:checked {
//             background-color: #f43f5e;
//             border-color: #f43f5e;
//           }

//           .ingredient-label {
//             cursor: pointer;
//             transition: all 0.2s;
//           }

//           .ingredient-label.checked {
//             text-decoration: line-through;
//             color: #9ca3af;
//           }

//           .nutrition-section {
//             margin-top: 32px;
//           }

//           .nutrition-title {
//             font-weight: 600;
//             margin: 0 0 12px 0;
//             font-size: 16px;
//           }

//           .nutrition-grid {
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             gap: 8px;
//             font-size: 14px;
//           }

//           .nutrition-item {
//             background-color: #f3f4f6;
//             padding: 8px;
//             border-radius: 6px;
//             text-align: center;
//           }

//           .nutrition-label {
//             font-weight: 500;
//           }

//           .action-buttons {
//             margin-top: 24px;
//             display: flex;
//             gap: 12px;
//           }

//           .btn-primary {
//             flex: 1;
//             background-color: #f43f5e;
//             color: white;
//             border: none;
//             padding: 8px 16px;
//             border-radius: 8px;
//             font-weight: 500;
//             cursor: pointer;
//             transition: background-color 0.2s;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             gap: 8px;
//           }

//           .btn-primary:hover {
//             background-color: #e11d48;
//           }

//           .btn-secondary {
//             flex: 1;
//             background-color: white;
//             color: #374151;
//             border: 1px solid #d1d5db;
//             padding: 8px 16px;
//             border-radius: 8px;
//             font-weight: 500;
//             cursor: pointer;
//             transition: background-color 0.2s;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             gap: 8px;
//           }

//           .btn-secondary:hover {
//             background-color: #f9fafb;
//           }

//           .related-section {
//             padding: 48px 0;
//             background-color: #f9fafb;
//           }

//           .related-container {
//             max-width: 1200px;
//             margin: 0 auto;
//             padding: 0 16px;
//           }

//           .related-title {
//             font-size: 24px;
//             font-weight: 700;
//             margin: 0 0 32px 0;
//             text-align: center;
//             font-family: 'Poppins', sans-serif;
//           }

//           .related-grid {
//             display: grid;
//             grid-template-columns: 1fr;
//             gap: 24px;
//           }

//           @media (min-width: 768px) {
//             .related-grid {
//               grid-template-columns: repeat(3, 1fr);
//             }
//           }

//           .recipe-card {
//             background-color: white;
//             border-radius: 12px;
//             overflow: hidden;
//             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//             transition: box-shadow 0.2s;
//           }

//           .recipe-card:hover {
//             box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
//           }

//           .recipe-img {
//             width: 100%;
//             height: 192px;
//             object-fit: cover;
//           }

//           .recipe-card-content {
//             padding: 24px;
//           }

//           .recipe-card-title {
//             font-size: 20px;
//             font-weight: 600;
//             margin: 0 0 8px 0;
//           }

//           .recipe-card-meta {
//             display: flex;
//             align-items: center;
//             gap: 4px;
//             font-size: 14px;
//             color: #6b7280;
//             margin-bottom: 16px;
//           }

//           .recipe-meta-text {
//             margin-right: 16px;
//           }

//           .view-recipe-btn {
//             color: #f43f5e;
//             font-weight: 500;
//             background: none;
//             border: none;
//             cursor: pointer;
//             transition: color 0.2s;
//             display: flex;
//             align-items: center;
//             gap: 4px;
//             padding: 0;
//           }

//           .view-recipe-btn:hover {
//             color: #e11d48;
//           }

//           .footer {
//             background-color: #1f2937;
//             color: white;
//             padding: 48px 0;
//           }

//           .footer-container {
//             max-width: 1200px;
//             margin: 0 auto;
//             padding: 0 16px;
//           }

//           .footer-grid {
//             display: grid;
//             grid-template-columns: 1fr;
//             gap: 32px;
//           }

//           @media (min-width: 768px) {
//             .footer-grid {
//               grid-template-columns: repeat(4, 1fr);
//             }
//           }

//           .footer-brand {
//             font-size: 20px;
//             font-weight: 700;
//             margin: 0 0 16px 0;
//             font-family: 'Poppins', sans-serif;
//           }

//           .footer-desc {
//             color: #d1d5db;
//             margin: 0;
//             line-height: 1.6;
//           }

//           .footer-heading {
//             font-weight: 600;
//             margin: 0 0 16px 0;
//             font-size: 16px;
//           }

//           .footer-list {
//             list-style: none;
//             padding: 0;
//             margin: 0;
//             display: flex;
//             flex-direction: column;
//             gap: 8px;
//           }

//           .footer-link {
//             color: #d1d5db;
//             text-decoration: none;
//             transition: color 0.2s;
//           }

//           .footer-link:hover {
//             color: white;
//           }

//           .social-links {
//             display: flex;
//             gap: 16px;
//           }

//           .social-link {
//             color: #d1d5db;
//             transition: color 0.2s;
//           }

//           .social-link:hover {
//             color: white;
//           }

//           .footer-bottom {
//             border-top: 1px solid #374151;
//             margin-top: 32px;
//             padding-top: 32px;
//             text-align: center;
//             color: #9ca3af;
//           }

//           .footer-bottom p {
//             margin: 0;
//           }
//         `}</style>
//       </div>
//     </>
//   );
// }