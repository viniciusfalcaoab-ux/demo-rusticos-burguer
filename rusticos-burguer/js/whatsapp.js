/*==================================================
RÚSTICO'S BURGUER
MODAL DE PERSONALIZAÇÃO
==================================================*/

let produtoSelecionado = null;

const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const cancelar = document.getElementById("cancelModal");
const confirmar = document.getElementById("confirmModal");

/*=========================================
ABRIR MODAL
=========================================*/

document.querySelectorAll(".add-cart").forEach(botao=>{

    botao.addEventListener("click",(e)=>{

        e.preventDefault();

        produtoSelecionado = {

            id: botao.dataset.id,
            nome: botao.dataset.name,
            preco: Number(botao.dataset.price)

        };

        if(modalTitle){

            modalTitle.textContent = produtoSelecionado.nome;

        }

        limparModal();

        modal.classList.add("active");

    });

});

/*=========================================
CANCELAR
=========================================*/

cancelar?.addEventListener("click",()=>{

    modal.classList.remove("active");

});

/*=========================================
FECHAR AO CLICAR FORA
=========================================*/

modal?.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("active");

    }

});

/*=========================================
CONFIRMAR
=========================================*/

confirmar?.addEventListener("click",()=>{

    let adicionais=[];

    let valorExtras=0;

    document.querySelectorAll("#productModal input[type=checkbox]").forEach(item=>{

        if(item.checked){

            adicionais.push(item.value);

            valorExtras += Number(item.dataset.price);

        }

    });

    let molho="Sem Molho";

    const molhoSelecionado=document.querySelector("input[name=molho]:checked");

    if(molhoSelecionado){

        molho=molhoSelecionado.value;

    }

    const observacao=document.getElementById("observacao").value.trim();

    adicionarProdutoPersonalizado({

        id:produtoSelecionado.id,

        nome:produtoSelecionado.nome,

        preco:produtoSelecionado.preco,

        adicionais,

        molho,

        observacao,

        valorExtras

    });

    modal.classList.remove("active");

});

/*=========================================
LIMPAR MODAL
=========================================*/

function limparModal(){

    document.querySelectorAll("#productModal input[type=checkbox]").forEach(item=>{

        item.checked=false;

    });

    document.querySelector("input[name=molho][value='Sem Molho']").checked=true;

    document.getElementById("observacao").value="";

}