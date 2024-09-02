//ordenar la lista
document.addEventListener("DOMContentLoaded", function () {
    function sortListAlphabetically(id) {
        const list = document.getElementById(id);
        const items = Array.from(list.getElementsByTagName("li"));

        items.sort((a, b) => {
            const textA = a.textContent.trim().toUpperCase();
            const textB = b.textContent.trim().toUpperCase();
            return textA.localeCompare(textB);
        });

        items.forEach(item => list.appendChild(item));
    }

    // Ordena las listas por alfabeto
    sortListAlphabetically("cursos");
    sortListAlphabetically("programas");
    sortListAlphabetically("proyectos");
});
