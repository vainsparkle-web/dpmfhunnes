document.addEventListener("DOMContentLoaded", function() {
    const kamusLink = {
        "#home": "/home",
        "index.html#home": "/home",
        
        "#about": "/home/about",
        "index.html#about": "/home/about",
        
        "#events": "/home/events",
        "index.html#events": "/home/events",
        
        "#team": "/home/team",
        "index.html#team": "/home/team",

        "#contact": "/home/contact",
        "index.html#contact": "/home/contact"
    };

    const semuaLink = document.querySelectorAll('a');

    semuaLink.forEach(function(link) {
        
        const tulisanHrefAsli = link.getAttribute('href'); 

        if (tulisanHrefAsli && kamusLink[tulisanHrefAsli] !== undefined) {
            
            link.href = kamusLink[tulisanHrefAsli];
            
        }
    });

    console.log("Semua link berhasil disesuaikan dengan kamus!");
});
