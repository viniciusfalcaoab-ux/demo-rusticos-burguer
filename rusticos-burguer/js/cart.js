/*==================================================
RÚSTICO'S BURGUER
CARRINHO DE COMPRAS
==================================================*/

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const drawer = document.getElementById("cartDrawer");

/*=========================================
ABRIR / FECHAR
=========================================*/

if(openCart){

    openCart.addEventListener("click",()=>{

        drawer.classList.add("open");

    });

}

if(closeCart){

    closeCart.addEventListener("click",()=>{

        drawer.classList.remove("open");

    });

}

/*=========================================
ADICIONAR PRODUTOS
=========================================*/

document.querySelectorAll(".add-cart").forEach(botao=>{

    botao.addEventListener("click",()=>{

        const id = botao.dataset.id;
        const nome = botao.dataset.name;
        const preco = Number(botao.dataset.price);

        adicionarProduto(id,nome,preco);

    });

});

/*=========================================
FUNÇÃO ADICIONAR
=========================================*/

function adicionarProduto(id,nome,preco){

    const existente = cart.find(item=>item.id===id);

    if(existente){

        existente.quantidade++;

    }else{

        cart.push({

            id,
            nome,
            preco,
            quantidade:1

        });

    }

    salvarCarrinho();

    atualizarCarrinho();

    mostrarToast(nome+" adicionado ao carrinho.");

}

/*=========================================
SALVAR
=========================================*/

function salvarCarrinho(){

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}

/*=========================================
ATUALIZAR
=========================================*/

function atualizarCarrinho(){

    if(!cartItems) return;

    cartItems.innerHTML="";

    let total=0;

    let quantidadeTotal=0;

    if(cart.length===0){

        cartItems.innerHTML="<p>Seu carrinho está vazio.</p>";

    }

    cart.forEach(item=>{

        total += item.preco*item.quantidade;

        quantidadeTotal += item.quantidade;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>${item.nome}</strong>

                <p>R$ ${item.preco.toFixed(2)}</p>

            </div>

            <div class="cart-controls">

                <button onclick="diminuir('${item.id}')">-</button>

                <span>${item.quantidade}</span>

                <button onclick="aumentar('${item.id}')">+</button>

            </div>

        </div>

        `;

    });

    cartTotal.textContent="R$ "+total.toFixed(2);

    cartCount.textContent=quantidadeTotal;

}
/*=========================================
AUMENTAR QUANTIDADE
=========================================*/

function aumentar(id){

    const item = cart.find(produto => produto.id === id);

    if(item){

        item.quantidade++;

        salvarCarrinho();

        atualizarCarrinho();

    }

}

/*=========================================
DIMINUIR QUANTIDADE
=========================================*/

function diminuir(id){

    const index = cart.findIndex(produto => produto.id === id);

    if(index === -1) return;

    cart[index].quantidade--;

    if(cart[index].quantidade <= 0){

        cart.splice(index,1);

    }

    salvarCarrinho();

    atualizarCarrinho();

}

/*=========================================
LIMPAR CARRINHO
=========================================*/

function limparCarrinho(){

    cart.length = 0;

    salvarCarrinho();

    atualizarCarrinho();

}

/*=========================================
TOAST
=========================================*/

function mostrarToast(texto){

    let toast = document.querySelector(".toast");

    if(!toast){

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = texto;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

/*=========================================
MENSAGEM WHATSAPP
=========================================*/

function gerarMensagemWhatsApp(){

    if(cart.length===0){

        alert("Seu carrinho está vazio.");

        return;

    }

    let mensagem = "🍔 *NOVO PEDIDO - RÚSTICO'S BURGUER*%0A%0A";

    let total = 0;

    cart.forEach(item=>{

        const subtotal = item.preco * item.quantidade;

        total += subtotal;

        mensagem +=
`• ${item.nome}
Qtd: ${item.quantidade}
Valor: R$ ${subtotal.toFixed(2)}

`;

    });

    mensagem += "%0A";

    mensagem += "*TOTAL:* R$ " + total.toFixed(2);

    mensagem += "%0A%0A";

    mensagem += "Nome:%0A";

    mensagem += "Endereço:%0A";

    mensagem += "Forma de pagamento:%0A";

    const telefone = "551146621556";

    window.open(

        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`,

        "_blank"

    );

}

/*=========================================
BOTÃO WHATSAPP
=========================================*/

const btnWhatsapp = document.getElementById("btnWhatsapp");

if(btnWhatsapp){

    btnWhatsapp.addEventListener("click",()=>{

        gerarMensagemWhatsApp();

    });

}

/*=========================================
INICIAR
=========================================*/

atualizarCarrinho();
