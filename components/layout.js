import Nav from './nav';
import MobileNav from './mobileNav';
import styles from './layout.module.css'
const Layout = ({ children, categories, seo }) => (
  <>
    <Nav categories={categories} className={styles.nav}/>

    {children}
  </>
);

export default Layout;
