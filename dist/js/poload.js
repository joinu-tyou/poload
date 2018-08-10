// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.enablePoloads = function (fnProcessContent) {

        var poLoadTimeout;

        var fnLoadPoContent = (e)=>{
            var $this = $(e.currentTarget);

            //Se já carregou os contents dos popovers não precisa executar novamente!
            if ($this.data("bs.popover") != undefined) {
                return;
            }

            poLoadTimeout = setTimeout(()=>{
                var load_content = `<i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i><span class="sr-only">Loading...</span>`;

                $this.popover({
                    content: load_content,
                    html: true,
                    placement: "left",
                    container: "body",
                    trigger: "manual"
                }).popover('show');

                //Evento para mudança do comportamento padrão para abertura do popover em Hover
                $this.on('mouseenter', (e)=>{
                    poLoadTimeout = setTimeout(()=>{
                        $this.popover('show');
                    }, 400);
                    $this.one('mouseleave', ()=>{
                        clearTimeout(poLoadTimeout);
                    })
                });

                $.ajax({
                    url: $this.data('poload'),
                    global: false,
                    success: (data)=>{
                        //Chamamos a função de callback passando como parâmetro o retorno do Ajax
                        $this.attr('data-content', fnProcessContent($this, data));
                        //Evento para atualização do conteúdo
                        $this.one('hidden.bs.popover', ()=>{
                            $this.popover('show');
                        });
                        //Esconde para poder atualizar o conteúdo do popover
                        $this.popover('hide');
                    }
                });
            }, 400);
        };

        //Ativa os popovers
        var i;
        for (i = 0; i < this.length; i++) { 
            var element = $(this[i]);
            //POPOVERS DINÂMICOS
            //Se for um poload ajax checamos o parâmetro URL
            if (element.data('poload') != undefined) {
                //Atribuimos a função de callback ao evento    
                element.on('mouseenter', fnLoadPoContent);

                //Cancela o Load dos poloads, em um mouseleave muito rapido
                element.on('mouseleave', ()=>{
                    clearTimeout(poLoadTimeout);
                });
            } else {
                //POPOVERS ESTATICOS
                //Container body para corrigir o bug no popover dos headers de tabelas
                element.popover({container: "body"});
            }
        }

        return true; 
    };
}));