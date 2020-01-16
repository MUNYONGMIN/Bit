<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>ProductAdd</title>
    <link rel="stylesheet" href="<c:url value="/resources/css/productadd.css" />">
    <script type="text/javascript" src="http://code.jquery.com/jquery-3.4.1.js" charset="UTF-8"></script>
    <script type="text/javascript">
        function prAdd(url) {
            var frm = document.getElementById("product_add_form");
            frm.action = url;
            frm.submit();
        }
        
        var sel_files = [];
        $(document).ready(function(){
            $("#input_imgs").on("change", handleImgsFileSelect);
        });

        function handleImgsFileSelect(e) {
            var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);

            filesArr.forEach(function(f) {
                if(!f.type.match("image.*")) {
                    alert("확장자는 이미지 확장자만 가능합니다.");
                    return;
                }

                sel_files.push(f);

                var reader = new FileReader();
                reader.onload = function(e) {
                    var img_html = "<img src=\"" + e.target.result + "\" />";
                    $(".imgs_wrap").append(img_html);
                }
                reader.readAsDataURL(f);
            });
        }
    </script>
</head>

<body>
    <div class="container">
        <form class="product-form" name="product_add_form" action="" method="POST">
            <h3>기본정보</h3>
            <hr>
            <div class="product-image">
                <div class="image-text">
                	    상품이미지
                </div>
                <div class="image-wrapper">
                    <input type="file" id="input_imgs" class="file" multiple />
                    <div class="imgs_wrap">
                        
                    </div>
                    
                    <div class="caution">
                        <p>*상품 이미지는 640x640에 최적화 되어 있습니다.</p>
                        <p>-이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다.</p>
                        <p>-큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.</p>
                        <p>최대 지원 사이즈인 640X640으로 리사이즈 해서 올려주세요.(개당 이미지 최대 10M)</p>
                    </div>
                </div>
            </div>
            <div class="product-subject">
                <div class="subject-text">제목</div>
                <div class="subject-input">
                    <input type="text" name="product_name" placeholder="상품명">
                </div>
            </div>
            <div class="product-category">
                <div class="category-text">카테고리</div>
                <div class="category-input">
                    <select name="category_L">
                        <option selected value="실버">실버</option>
                        <option value="골드">골드</option>
                        <option value="플레티넘">플레티넘</option>
                        <option value="개인쉐어">개인쉐어</option>
                    </select>
                    <select name="category_M">
                        <option selected value="04">0~4</option>
                        <option value="57">5~7</option>
                    </select>
                    <select name="category_S">
                        <option selected value="과학박스">과학박스</option>
                        <option value="자동차">자동차</option>
                        <option value=" 로보트">로보트</option>
                        <option value="진근박스">진근박스</option>
                    </select>
                </div>
            </div>
            <div class="product-explain">
                <div class="explain-text">설명</div>
                <div class="explain-input">
                    <input type="text" name="product_explain" placeholder="설명을 입력하세요.">
                </div>
            </div>
            <div class="product-amount">
                <div class="amount-text">수량</div>
                <div class="amount-input">
                    <input type="number" name="product_amount"> 개
                </div>
            </div>
            <div>
                <button class="btn-product">
             	       상품 등록하기
                </button>
            </div>
        </form>
    </div>
</body>

</html>