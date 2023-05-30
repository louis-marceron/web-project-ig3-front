export default {
  render: async () => {
    return `
        <nav>
          <a href="/repas" class="internal-link">Repas</a>
          <a href="/statistiques" class="internal-link">Stats</a>
          <a href="/compte" class="internal-link">Profil</a>
        </nav>
      `;
  },
  afterRender: async () => {
    const links = document.querySelectorAll('.internal-link');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove 'active' class from all links
        links.forEach(l => l.style.color = '');

        // Add 'active' class to the clicked link
        link.style.color = '#006600'; // Change this to the desired color
      });
    });

    // Highlight the link that corresponds to the current URL
    const currentPath = window.location.pathname;
    const currentLink = document.querySelector(`a[href="${currentPath}"]`);
    console.log(currentLink);
    if (currentLink) {
      currentLink.style.color = '#006600'; // Change this to the desired color
    }
  }
};
