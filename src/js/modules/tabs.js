const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        content.forEach(item => {
            item.style.display = "none";
            item.classList.remove('animated', 'fadeIn');
        });
  
        tab.forEach(item => {
            item.classList.remove(activeClass, 'animated', 'fadeIn');
        });
    }

    function showTabContent(i = 0) {
        content[i].style.display = display;
        content[i].classList.add('animated', 'fadeIn');
        tab[i].classList.add(activeClass, 'animated', 'fadeIn');
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target && (
            target.classList.contains(tabSelector.replace(/\./,"")) || 
            target.parentNode.classList.contains(tabSelector.replace(/\./,"")))) {
                tab.forEach((item, i) => {
                    if (target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
        }
    });
    
};

export default tabs;