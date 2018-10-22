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
