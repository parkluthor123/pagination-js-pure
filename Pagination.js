class Pagination{

    #currentPage = 1;
    #container = null;
    #perPage = 0;
    #maxPagesButtons = null;
    #listItems = [];
    #html = '';
   
    constructor({listID, perPage, maxPagesButtons}){
        this.#container = document.querySelector(listID);
        this.#perPage = perPage;
        this.#maxPagesButtons = maxPagesButtons || 5; 
        this.#setListElements();
        this.#createPages();
    }
    
    //Captura todos os elementos "li" do container
    #setListElements(){
        this.#listItems = Array.from(this.#container.querySelectorAll('li'));
    }

    // Método que inicia a paginação
    #createPages(){
        const items = this.#listItems;
        this.#container.innerHTML = '';
        const partialItems = [[]]

        // Divide o array pelo numero de itens por pagina
        for(let i = 0; i < items.length; i + this.#perPage){
            partialItems.push(items.slice(i, i = i + this.#perPage));
        }

        this.#html = '';
        partialItems[this.#currentPage].forEach((item, i) => {
            if(i < this.#perPage){
                this.#html += item.outerHTML;
            }
        });
        
        this.#createPagination(items.length, partialItems.length - 1);
    }


    // Método que cria os botões de paginação
    #createPagination(total, lastPage){

        // Conterte o total de paginas em array
        const pages = Array.from({length: lastPage}, (v, i) => i + 1);
        
        // Pega o elemento pai que obrigatoriamente precisa ter a classe 'paginator'
        const parentContainer = document.querySelector('.paginator');
        
        parentContainer.innerHTML = '';
        
        parentContainer.appendChild(this.#container);

        this.#container.innerHTML = this.#html;

        parentContainer.innerHTML += `
            <div style="display: flex; gap: 10px;">
                <button type="button" data-pagination-buttons="prev">Prev</button>
                <div class="pages-items" style="display: flex; gap: 10px;">
                    ${this.#currentPage > this.#maxPagesButtons ? pages.slice(this.#currentPage -1, pages.length).map((items, i) => {
                        if(i <= this.#maxPagesButtons - 1)
                        {
                            return `<span data-pagination-buttons="page-number" ${items === this.#currentPage ? `style="text-decoration: underline"` : `style="text-decoration: none"`}>${items}</span>${i === this.#maxPagesButtons - 1 ? `...<span ${lastPage === this.#currentPage ? `style="text-decoration: underline"` : `style="text-decoration: none"`} data-pagination-buttons="page-number">${lastPage}</span>` : ''}`;
                        }
                    }).join('') : pages.map((items, i) => {
                        if(i <= this.#maxPagesButtons - 1)
                        {
                            return `<span data-pagination-buttons="page-number" ${items === this.#currentPage ? `style="text-decoration: underline"` : `style="text-decoration: none"`}>${items}</span>${i === this.#maxPagesButtons - 1 ? `...<span ${lastPage === this.#currentPage ? `style="text-decoration: underline"` : `style="text-decoration: none"`} data-pagination-buttons="page-number">${lastPage}</span>` : ''}`;
                        }
                    }).join('')}
                </div>
                <button type="button" data-pagination-buttons="next">Next</button>
            </div>
            <br/>
            <span>Total of ${total} items</span>
        `;

        const nextButton = document.querySelector('[data-pagination-buttons="next"]');
        const prevButton = document.querySelector('[data-pagination-buttons="prev"]');
        const pagesButton = document.querySelectorAll('[data-pagination-buttons="page-number"]');

        nextButton.addEventListener('click', () => this.#setNextPage(lastPage));
        prevButton.addEventListener('click', () => this.#setPrevPage());
        
        pagesButton.forEach((buttons)=>{
            buttons.addEventListener('click', (e) => {
                this.#setUpdateCurrentPage(Number(e.target.textContent));
                this.#createPages();
            });
        })
    }

    // Método que atualiza a pagina atual
    #setUpdateCurrentPage(page){
        this.#currentPage = page;
    }

    // Método que avança para a proxima pagina
    #setNextPage(lastPage){
        this.#currentPage < lastPage ? this.#setUpdateCurrentPage(this.#currentPage + 1) : this.#currentPage;
        this.#createPages();
    }

    // Método que volta para a pagina anterior
    #setPrevPage(){
        this.#currentPage != 1 ? this.#setUpdateCurrentPage(this.#currentPage - 1) : this.#currentPage;
        this.#createPages();
    }
}