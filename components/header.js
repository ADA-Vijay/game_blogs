import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "@/styles/Header.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Header() {
  const [category, setCategory] = useState({});
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(apiUrl, {
        query: `
          query {
            categories {
              nodes {
                categoryId
                name
                children {
                  nodes {
                    categoryId
                    name
                  }
                }
              }
            }
          }
        `,
      });

      const data = response.data;

      if (data.errors) {
        console.log("GraphQL Errors:", data.errors);
      } else {
        const uniqueCategories = data.data.categories.nodes.filter(
          (category) => {
            return !data.data.categories.nodes.some((otherCategory) => {
              return (
                otherCategory.children.nodes.length > 0 &&
                otherCategory.children.nodes.some(
                  (child) => child.categoryId === category.categoryId
                )
              );
            });
          }
        );

        const uniqueResponse = {
          ...data,
          data: {
            ...data.data,
            categories: {
              nodes: uniqueCategories,
            },
          },
        };

        setCategory(uniqueResponse.data.categories);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Navbar expand="lg" className={styles.headerWrap}>
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Brand href="#home">Gamewitted</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {category && category.nodes && category.nodes.length > 0
              ? category.nodes.map((cat) => (
                  <React.Fragment key={cat.categoryId}>
                    {cat.children &&
                    cat.children.nodes &&
                    cat.children.nodes.length > 0 ? (
                      <NavDropdown 
                        title={cat.name}
                        className={styles.headerDropdown}
                      >
                        {cat.children.nodes.map((sub) => (
                          <NavDropdown.Item href={`/${cat.name}/${sub.name}`}>{sub.name}</NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    ) : (
                      <Nav.Link href={cat.name === 'Home' ? '/' : `/${cat.name}`} className={styles.headerlink}>
                      {cat.name}
                    </Nav.Link>
                    )}
                  </React.Fragment>
                ))
              : ""}

            <div className={styles.extraHeaderWrap}>
              <div className={styles.searchHeaderWrap}>
                <div className={styles.searchInput}>
                  <Form.Control type="text" placeholder="" />
                  <span className={styles.searchIcon}>
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

// export async function getServerSideProps(){
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const response = await axios.post(apiUrl, {
//     query: `
//       query {
//         categories {
//           nodes {
//             categoryId
//             name
//             children {
//               nodes {
//                 categoryId
//                 name
//               }
//             }
//           }
//         }
//       }
//     `,
//   });

//   const data = response.data;
//   console.log('Data:', data);
//   return {
//     props: {
//       categories: data.categories,
//     },
//   };

// }
