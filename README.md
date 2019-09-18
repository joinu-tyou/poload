# poload
A Bootstrap 3 dinamic popover with ajax content


备注：点击后，动态取数后，显示Popover的另一种方法
        <a class="data-poload" href="#" >
            <i class="far fa-book"></i>
        </a>

        $('.data-poload').click(function () {
            var ProductCode = 1;

            var e = $(this);

            $.ajax({
                type: 'post',
                dataType: 'html',
                url: 'getdata.php',
                data: {
                    ProductCode: ProductCode
                },
                success: function (data) {
                    e.popover({ html: true,  content: data }).popover('show');
                },
                error: function (response) {
                    // TODO エラー処理の仕様？
                }
            });
        });
        
        
        備考：普通Popoverとして、動作できる方法
        1回Loading...を表示して、ajaxの戻り値を利用して、再更新します。
        <a class="popup-ajax"  href="#" data-product-code="@(Model.ProductCode)" >
          新規
      </a>

$('a.popup-ajax').popover({
          "html": true,
          "content": function () {
              var div_id = "tmp-id-" + $.now();
              var ProductCode = this.getAttribute('data-product-code');
              return details_in_popup(ProductCode, div_id);
          }
      });

    function details_in_popup(ProductCode, div_id) {


          $.ajax({
              type: 'post',
              dataType: 'html',
              url: url,
              data: {
                  ProductCode: ProductCode
              },
              success: function (data) {

                  $('#' + div_id).html(data);
              },
              error: function (response) {
                  // TODO エラー処理の仕様？
              }
          });
          return '<div id="' + div_id + '">Loading...</div>';
      }
