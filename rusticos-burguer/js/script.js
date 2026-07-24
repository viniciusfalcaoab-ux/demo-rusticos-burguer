/*==================================================
RÚSTICO'S BURGUER
SCRIPT PRINCIPAL
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    iniciarLoader();
    iniciarMenuMobile();
    iniciarBotaoTopo();
    iniciarFAQ();
    iniciarReveal();
    iniciarNavbar();
    iniciarScrollSuave();
    iniciarContadores();

});

/*==================================================
LOADING
==================================================*/

function iniciarLoader(){

    const loader = document.getElementById("loader");

    if(!loader) return;

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            loader.classList.add("hidden");

        },700);

    });

}

/*==================================================
MENU MOBILE
==================================================*/

function iniciarMenuMobile(){

    const menu = document.querySelector("nav");
    const botao = document.getElementById("menu-mobile");

    if(!menu || !botao) return;

    botao.addEventListener("click",()=>{

        menu.classList.toggle("active");

    });

    document.querySelectorAll("nav a").forEach(link=>{

        link.addEventListener("click",()=>{

            menu.classList.remove("active");

        });

    });

}

/*==================================================
NAVBAR STICKY
==================================================*/

function iniciarNavbar(){

    const header=document.querySelector("header");

    if(!header) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>60){

            header.classList.add("sticky");

        }else{

            header.classList.remove("sticky");

        }

    });

}

/*==================================================
BOTÃO TOPO
==================================================*/

function iniciarBotaoTopo(){

    const botao=document.getElementById("topo");

    if(!botao) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            botao.classList.add("show");

        }else{

            botao.classList.remove("show");

        }

    });

    botao.addEventListener("click",()=>{

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}

/*==================================================
FAQ
==================================================*/

function iniciarFAQ(){

    const botoes=document.querySelectorAll(".faq-btn");

    botoes.forEach(botao=>{

        botao.addEventListener("click",()=>{

            const conteudo=botao.nextElementSibling;

            if(conteudo.style.display==="block"){

                conteudo.style.display="none";

            }else{

                document.querySelectorAll(".faq-content").forEach(item=>{

                    item.style.display="none";

                });

                conteudo.style.display="block";

            }

        });

    });

}

/*==================================================
SCROLL REVEAL
==================================================*/

function iniciarReveal(){

    const elementos=document.querySelectorAll(

        ".reveal,.reveal-left,.reveal-right,.reveal-zoom"

    );

    function revelar(){

        const altura=window.innerHeight;

        elementos.forEach(el=>{

            const topo=el.getBoundingClientRect().top;

            if(topo<altura-100){

                el.classList.add("active");

            }

        });

    }

    revelar();

    window.addEventListener("scroll",revelar);

}

/*==================================================
SCROLL SUAVE
==================================================*/

function iniciarScrollSuave(){

    document.querySelectorAll('a[href^="#"]').forEach(link=>{

        link.addEventListener("click",(e)=>{

            const alvo=document.querySelector(link.getAttribute("href"));

            if(!alvo) return;

            e.preventDefault();

            alvo.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}

/*==================================================
CONTADORES
==================================================*/

function iniciarContadores(){

    const numeros=document.querySelectorAll(".contador");

    if(!numeros.length) return;

    let executou=false;

    function animar(){

        if(executou) return;

        const topo=numeros[0].getBoundingClientRect().top;

        if(topo<window.innerHeight-100){

            executou=true;

            numeros.forEach(numero=>{

                const alvo=+numero.dataset.numero;

                let atual=0;

                const incremento=Math.ceil(alvo/80);

                const timer=setInterval(()=>{

                    atual+=incremento;

                    if(atual>=alvo){

                        atual=alvo;

                        clearInterval(timer);

                    }

                    numero.textContent=atual;

                },20);

            });

        }

    }

    window.addEventListener("scroll",animar);

    animar();

}

/*==================================================
EFEITO NOS CARDS
==================================================*/

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});

/*==================================================
BOTÕES
==================================================*/

document.querySelectorAll(".btn-primary,.btn-card").forEach(botao=>{

    botao.addEventListener("mousedown",()=>{

        botao.style.transform="scale(.96)";

    });

    botao.addEventListener("mouseup",()=>{

        botao.style.transform="scale(1)";

    });

});

/*==================================================
PRELOAD DAS IMAGENS
==================================================*/

window.addEventListener("load",()=>{

    document.querySelectorAll("img").forEach(img=>{

        img.loading="lazy";

    });

});

console.log("Rústico's Burguer carregado com sucesso.");