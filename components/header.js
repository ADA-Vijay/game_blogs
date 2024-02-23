import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "@/styles/Header.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Header() {
  const [category, setCategory] = useState({});
  const [subCategory, setSubCategory] = useState([]);
  // const [saveCategory,setSaveCategory] = useState([])
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl + "categories");

      const data = response.data;

      if (data.errors) {
        console.log("GraphQL Errors:", data.errors);
      } else {
        const categoriesMap = new Map();
        const subCategoriesMap = new Map();

        data.forEach((category) => {
          if (category.parent === 0) {
            categoriesMap.set(category.id, category);
          } else {
            if (!subCategoriesMap.has(category.parent)) {
              subCategoriesMap.set(category.parent, []);
            }
            subCategoriesMap.get(category.parent).push(category);
          }
        });

        setCategory(Array.from(categoriesMap.values()));
        setSubCategory(subCategoriesMap);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   const searchQuery = event.target.elements.search.value;

  //   router.push(`/search?query=${searchQuery}`);
  // };

  return (
    <Navbar expand="lg" className={styles.headerWrap}>
      <Container>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Brand href="/">Gamewitted</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {category && category.length > 0
              ? category.map((cat) => (
                  <React.Fragment key={cat.id}>
                    {subCategory.get(cat.id) &&
                      subCategory.get(cat.id).length > 0 && (
                        <NavDropdown
                          title={cat.name}
                          className={styles.headerDropdown}
                        >
                          {subCategory.get(cat.id).map((sub) => (
                            <NavDropdown.Item key={sub.id}>
                            <Link key={sub.id} href={`/${sub.slug}`} className={`${styles.navLink} ${styles.headerlink}`}>
                              {sub.name}
                            </Link>
                          </NavDropdown.Item>                          
                          ))}
                        </NavDropdown>
                      )}
                    {!subCategory.has(cat.id) && (
                      <Nav.Link key={sub.id}>
                        <Link
                          href={cat.slug === "home" ? "/" : `/${cat.slug}`}
                          className={`${styles.navLink} ${styles.headerlink}`}
                        >
                          {cat.name}
                        </Link>
                      </Nav.Link>
                    )}
                  </React.Fragment>
                ))
              : ""}

            <div className={styles.extraHeaderWrap}>
              <div className={styles.searchHeaderWrap}>
               
                <div className={styles.searchInput}>
                  <Form.Control type="text" placeholder="" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
                  <Link className={styles.searchLink} href={searchQuery && searchQuery !== "" && "/search?query="+ searchQuery}>
                  <span className={styles.searchIcon} >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </span>
                  </Link>        
                </div>
              </div>
              <div className={styles.headerMenuWrap}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
