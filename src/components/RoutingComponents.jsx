
import React, { useState, useEffect } from 'react';
import { 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate, 
  NavLink,
  Outlet 
} from 'react-router-dom';
import '../styles/routing-styles.css';


const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <NavLink to="/routing-demo" end>Home</NavLink>
      <NavLink to="/routing-demo/about">About</NavLink>
      <NavLink to="/routing-demo/contact">Contact</NavLink>
      <NavLink to="/routing-demo/products/1">Product Demo</NavLink>
      <NavLink to="/routing-demo/blog">Blog</NavLink>
    </nav>
  );
};


const Home = () => {
  return (
    <div className="page home-page">
      <h1>Welcome to Our Website</h1>
      <p>This is a demonstration of React Router basic setup.</p>
      <div className="featured-section">
        <h2>Featured Content</h2>
        <div className="featured-grid">
          <div className="featured-item">
            <h3>Latest Products</h3>
            <Link to="/routing-demo/products/1" className="feature-link">
              View Products
            </Link>
          </div>
          <div className="featured-item">
            <h3>Recent Blog Posts</h3>
            <Link to="/routing-demo/blog" className="feature-link">
              Read Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="page about-page">
      <h1>About Us</h1>
      <p>Learn more about our company and mission.</p>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>We are passionate about creating amazing web experiences.</p>
        </section>
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>To deliver high-quality web solutions using cutting-edge technology.</p>
        </section>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    
  };

  return (
    <div className="page contact-page">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchProduct = async () => {
      setLoading(true);
      try {
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProduct({
          id,
          name: `Product ${id}`,
          price: Math.floor(Math.random() * 100) + 1,
          description: `This is a detailed description for product ${id}.`
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="page product-page">
      <h1>Product Details</h1>
      <div className="product-card">
        <h2>{product.name}</h2>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        <div className="navigation-buttons">
          <button onClick={() => navigate(`/routing-demo/products/${parseInt(id) - 1}`)}>
            Previous Product
          </button>
          <button onClick={() => navigate(`/routing-demo/products/${parseInt(id) + 1}`)}>
            Next Product
          </button>
        </div>
      </div>
    </div>
  );
};


const BlogLayout = () => {
  return (
    <div className="page blog-page">
      <h1>Blog</h1>
      <div className="blog-container">
        <aside className="blog-sidebar">
          <h2>Recent Posts</h2>
          <nav className="blog-nav">
            <NavLink to="/routing-demo/blog/post/1">First Post</NavLink>
            <NavLink to="/routing-demo/blog/post/2">Second Post</NavLink>
            <NavLink to="/routing-demo/blog/post/3">Third Post</NavLink>
          </nav>
        </aside>
        <main className="blog-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    
    setPost({
      id: postId,
      title: `Blog Post ${postId}`,
      content: `This is the content for blog post ${postId}. It demonstrates nested routing in React Router.`
    });
  }, [postId]);

  if (!post) return <div>Loading post...</div>;

  return (
    <article className="blog-post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </article>
  );
};

const BlogIndex = () => {
  return (
    <div className="blog-index">
      <h2>Welcome to Our Blog</h2>
      <p>Select a post from the sidebar to read more.</p>
    </div>
  );
};


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/routing-demo')}>
        Return to Home
      </button>
    </div>
  );
};


const RoutingDemo = () => {
  return (
    <div className="routing-demo">
      <NavigationBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<BlogIndex />} />
            <Route path="post/:postId" element={<BlogPost />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export {
  RoutingDemo,
  Home,
  About,
  Contact,
  ProductDetails,
  BlogLayout,
  NotFound
};