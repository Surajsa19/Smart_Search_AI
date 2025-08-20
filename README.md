# Smart Search Engine

A high-performance, typo-tolerant search autocomplete engine built from the ground up with vanilla JavaScript. This project demonstrates the practical application of classic data structures and algorithms to solve real-world problems in user experience and data retrieval.

---

## ✨ Features

* **Real-Time Suggestions:** Provides instant search suggestions as the user types.
* **Efficient Prefix Matching:** Utilizes a **Trie** data structure for lightning-fast prefix-based searches, ensuring optimal performance even with a large dataset.
* **Typo-Tolerant Fuzzy Search:** Implements the **Levenshtein Distance** algorithm to find relevant matches even when users make up to two spelling errors.
* **Performance Optimized:** Employs a **300ms debounce** mechanism to prevent excessive API calls or computations on every keystroke, ensuring a smooth user experience.
* **Dynamic Highlighting:** Visually highlights the matching text in suggestions to improve readability and user focus.
* **ARIA Accessibility:** Implements ARIA attributes (`role`, `aria-expanded`, etc.) for better screen reader support and accessibility.
* **Clean & Simple UI:** A modern, intuitive interface built with HTML and styled with Tailwind CSS.

---

## 🛠️ Tech Stack & Algorithms

### Core Technologies

* **HTML5:** For the structure and accessibility of the web page.
* **CSS3 (with Tailwind CSS):** For modern, responsive styling.
* **Vanilla JavaScript (ES6+):** For all the application logic, data structures, and DOM manipulation. No frameworks, no libraries.

### Key Algorithms

1.  **Trie (Prefix Tree):**
    * **Why?** The Trie is the backbone of the instant prefix search. It allows for `O(L)` lookup time, where `L` is the length of the prefix, making it significantly more efficient than iterating through an array (`O(N*L)`).
    * **Implementation:** A custom `Trie` class was built to `insert` all 150+ search terms. The `findWordsWithPrefix` method traverses the tree to find the relevant node and then collects all child words, resulting in near-instantaneous suggestions.

2.  **Levenshtein Distance:**
    * **Why?** To create a more intelligent and user-friendly search that forgives typos. This dynamic programming algorithm calculates the "edit distance" between two strings.
    * **Implementation:** The algorithm is used to compare the user's query against the entire dataset. Results with a distance of 2 or less are included as "fuzzy" matches, ensuring users find what they're looking for despite minor errors.

---

## 🔧 How to Run Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Surajsa19/Smart_Search_AI.git](https://github.com/Surajsa19/Smart_Search_AI.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd Smart_Search_AI
    ```
3.  Open the `index.html` file in your favorite web browser. No special servers or build steps are required.

---

## 💡 Key Learnings

This project was a deep dive into the practical application of fundamental computer science concepts. Key takeaways include:

* **Algorithm-Driven UX:** Understanding how the right choice of data structure (Trie) can directly translate to a better, faster user experience.
* **Trade-offs in Search:** Balancing the speed of prefix matching (Trie) with the computational cost of fuzzy matching (Levenshtein Distance) to deliver a robust search solution.
* **Performance Optimization:** Implementing debouncing is critical in front-end development to manage event handling and prevent performance bottlenecks.
