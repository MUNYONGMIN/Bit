	$("document").ready(function(){
        var category = $(".zz").text(); //기본 게시판(자유게시판)
		var pageCount = 5; //한 화면에 나타낼 페이지 수
		var currentPage = 1;
		var totalData = 0;
		var dataPerPage = 5;
		
		alert("ready 부분 시작");
		selectData(category, dataPerPage, pageCount, currentPage);

		$('.community_menubar_item').click(function() {
			var category = $(this).attr('value'); //클릭한 게시판 이름
			alert("클릭한 카테고리 : " + category);
			$('.zz').text(category); //클릭한 게시판 이름으로 바꾸기
			$(".paginate").empty();  //페이징 초기화
			$('#wrapper-dropdown').val("최신순");
			$("#search_form").val("");
			$('.gg').empty();
			
			var dataPerPage = 5;
			
			if(category != "육아사진")
				dataPerPage = 5;
			else
				dataPerPage = 9;
			
			var pageCount = 5; //한 화면에 나타낼 페이지 수
			var currentPage = 1;
						      	
			selectData(category, dataPerPage, pageCount, currentPage);
		});
		
		$('#search_form').keypress(function(event){
			if (event.which == 13) {
				
			var currentPage = 1;
			var category = $(".zz").text(); 
			var pageCount = 5;
	        var search_Data = $("#search_form").val();
	        var dataPerPage = 5;
			
			if(category != "육아사진")
				dataPerPage = 5;
			else
				dataPerPage = 9;
	        
	        searchData(category, dataPerPage, pageCount, currentPage, search_Data);
			}
		});

	}); //document.ready         
	
		//필터
		function button_click() {
			var currentPage = 1;
			var category = $(".zz").text(); 
			var pageCount = 5;
			var dataPerPage = 5;
			
			if(category != "육아사진")
				dataPerPage = 5;
			else
				dataPerPage = 9;
			
			selectData(category, dataPerPage, pageCount, currentPage);
		}

        //리스트
        function selectData(category, dataPerPage, pageCount, currentPage) {
        	var category = $(".zz").text(); 
        	var option = $("#wrapper-dropdown option:selected").val(); //필터 값 가져오기
			var pageCount = 5; //한 화면에 나타낼 페이지 수
			var dataPerPage = 5;
			
			if(category != "육아사진")
				dataPerPage = 5;
			else
				dataPerPage = 9;
			
        	alert("selectData 들어옴 ==> category" + category  + "dataPerpage" + dataPerPage + "pageCount" + pageCount + "currentPage" + currentPage + "option" + option);
        	
        		$.ajax({
   				 url : '/bit_project/getCM.co', 
   	             type : "post", 
   	             data : {"page" : currentPage, "category" : category, "option" : option},
   	             dataType: 'json',
   	             async: false,
   	             success : function(data){  //성공
   	            		$('#community_data').empty();
   	                 $('.zz').text(category); //게시판이름 바꾸기
   	                 	
   						if(data.length != 0) { //게시글 존재
   	 					 	$.each(data, function(index, item) {
   	 					 	
   	 					 	totalData = item.cm_count; //해당 카테고리의 게시글 수
   	 					 	var output = ' ';
   							
   							var reg_date = new Date(item.regist); 
   			                var date = date_format(reg_date);  //날짜 format
			        			                		
   			                if (item.category != "육아사진") { //글게시판
   			                	
       							output += '<div id="community_container_mt">';
       							output += '<div class="underline"></div>';
       							output += '<div class="community_mt_title">';
       							output += '<a class="community_mt_link" href="community_detail.co?board_num=' + item.board_num  + '&pageNum=1"' + '</a>';
       							output += '<div class="community_mt_img">';
       							output += '<img src="" class="com_img1">';
       							output += '</div>';
       							output += '<h2 class="community_name">' + item.board_name + '</h2>';
       							output += '<p class="community_mt_mt">' + item.content + '</p>';
       							output += '<footer class="community_mt_footer">';
       							output += '<a class="community_mt_footer_user" href="community_user.co?nickname=' + item.nickname + ' ">';
       							output += '<img><i class="fas fa-user-circle fas-2x"></i>';
       							output += '<span class="community_mt_footer_users">' +  item.nickname + ' </span>';
       							output += '</a>';
       							output += '<span class="community_mt_footer_caption">';
       							output += '<span class="community_mt_footer_time">' + date + ' </span>';
       							output += '<span class="community_mt_footer_comments">' + "댓글 " + item.co_count + ' </span>';
       							output += '<span class="community_mt_footer_views">' + "조회수 " + item.count + ' </span>';
       							output += '</span>';
       							output += '</footer>';
       							output += '</div><br>';
       							output += '</div>';
       							
       							$('#community_data').append(output);
   			                }else { //사진게시판
   			                alert("사진 출력!!");
	                				output += '<div id="community_container_mi">';
       							output += '<div class="community_mi_title">';
       							output += '<a class="community_mi_link" href="community_detail.co?board_num=' + item.board_num  + '&pageNum=1"/>';
       							output += '<div class="community_mi_img">';
       							output += '<img src="" class="com_img2">';
       							output += '</div>';
       							output += '<h2 class="community_name">' + item.board_name + '</h2>';
       							output += '<address class="community_mi_writer">';
       							output += '<a class="community_mi_writer_user" href="community_user.co?nickname=' + item.nickname + ' ">'; //글쓴이 ?? 검색
       							output += '<img><i class="fas fa-user-circle"></i>';
       							output += '<span class="community_mt_footer_users">' + item.nickname + ' </span>';
       							output += '</a>';
       							output += '</address>';
       							output += '<footer class="community_mi_footer">';
       							output += '<span class="community_mi_footer_caption">';
       							output += '<span class="community_mi_footer_time">' + date  + ' </span>';
       							output += '<span class="community_mi_footer_comments">' + "댓글 " + item.co_count + ' </span>';
       							output += '<span class="community_mi_footer_views">' + "조회수 " + item.count + ' </span>';
       							output += '</span>';
       							output += '</footer>';
       							output += '</div>';
	                				output += '</div>';
	                				
	                				$('#community_data').append(output);
   			                }
   						}); //each
   	 					alert("total : " + totalData + dataPerPage + pageCount + currentPage);
 			             paging(totalData, dataPerPage, pageCount, currentPage);
 			            
   						}
   						else { //게시글 존재하지않을때
   							var outputnull = "<div class='community_ncontainer'>";
   							outputnull += "<div>등록된 게시글이 없습니다.</div>";
   							outputnull += "</div>";
   							$('#community_data').append(outputnull);
   						}
   					},
   	              error : function(data){
   	            	 alert('error');
   	              }//error
   			}); //ajax
   			
	}
        
      //검색
        function searchData(category, dataPerPage, pageCount, currentPage, search_Data) {
        	var category = $(".zz").text(); //카테고리
        	var totalData = 0; //총 게시글 수
			var pageCount = 5; //한 화면에 나타낼 페이지 수
			var search_Data = $("#search_form").val();
			var dataPerPage = 5;
			
			if(category != "육아사진")
				dataPerPage = 5;
			else
				dataPerPage = 9;
			
	        alert("검색값 : " + search_Data + " 카테고리 : " + category);

	        $.ajax({
	            url : '/bit_project/getCMsearch.co', 
   	            type : "post", 
   	            data : {"search_Data" : search_Data, "category" : category, "page" : currentPage},
   	            dataType: 'json',
   	            async: false,
   	        	cache : false,
	            success : function(data) {
	            		$('#community_data').empty();
	            		$(".paginate").empty();  //페이징 초기화
	            		
	            		if(data.length != 0) { //게시글 존재
	 					 $.each(data, function(index, item) {
	 						 
	 						$('.gg').text("검색 결과 " + item.cmsearch_count + " 건"); //검색 결과 안내
	 						 totalData = item.cmsearch_count; //검색 결과 총 갯수
	 						 
	 						var output = ' ';
							var reg_date = new Date(item.regist); 
			                var date = date_format(reg_date);  //날짜 format
			                alert(item.board_num + " / " + item.board_name + " / " + item.content + " / " + item.nickname + " / " + date + " / " + item.co_count + " / " + item.count);
			                
			                if (item.category != "육아사진") { //글게시판
			                	
   							output += '<div id="community_container_mt">';
   							output += '<div class="underline"></div>';
   							output += '<div class="community_mt_title">';
   							output += '<a class="community_mt_link" href="community_detail.co?board_num=' + item.board_num  + '&pageNum=1"' + '</a>';
   							output += '<div class="community_mt_img">';
   							output += '<img src="" class="com_img">';
   							output += '</div>';
   							output += '<h2 class="community_name">' + item.board_name + '</h2>';
   							output += '<p class="community_mt_mt">' + item.content + '</p>';
   							output += '<footer class="community_mt_footer">';
   							output += '<a class="community_mt_footer_user" href="community_user.co?nickname=' + item.nickname + ' ">';
   							output += '<img><i class="fas fa-user-circle fas-2x"></i>';
   							output += '<span class="community_mt_footer_users">' +  item.nickname + ' </span>';
   							output += '</a>';
   							output += '<span class="community_mt_footer_caption">';
   							output += '<span class="community_mt_footer_time">' + date + ' </span>';
   							output += '<span class="community_mt_footer_comments">' + "댓글 " + item.co_count + ' </span>';
   							output += '<span class="community_mt_footer_views">' + "조회수 " + item.count + ' </span>';
   							output += '</span>';
   							output += '</footer>';
   							output += '</div><br>';
   							output += '</div>';
   							
   							$('#community_data').append(output);
			                }else { //사진게시판
			                	
			                	output += '<div id="community_container_mi">';
   							output += '<div class="community_mi_title">';
   							output += '<a class="community_mi_link" href="community_detail.co?board_num=' + item.board_num  + '&pageNum=1"/>';
   							output += '<div class="community_mi_img">';
   							output += '<img src="" class="com_img2">';
   							output += '</div>';
   							output += '<h2 class="community_name">' + item.board_name + '</h2>';
   							output += '<address class="community_mi_writer">';
   							output += '<a class="community_mi_writer_user href="community_user.co?nickname=' + item.nickname + ' ">'; //글쓴이 ?? 검색
   							output += '<img><i class="fas fa-user-circle"></i>';
   							output += '<span class="community_mt_footer_users">' + item.nickname + ' </span>';
   							output += '</a>';
   							output += '</address>';
   							output += '<footer class="community_mi_footer">';
   							output += '<span class="community_mi_footer_caption">';
   							output += '<span class="community_mi_footer_time">' + date  + ' </span>';
   							output += '<span class="community_mi_footer_comments">' + "댓글 " + item.co_count + ' </span>';
   							output += '<span class="community_mi_footer_views">' + "조회수 " + item.count + ' </span>';
   							output += '</span>';
   							output += '</footer>';
   							output += '</div>';
                				output += '</div>';
                				
                				$('#community_data').append(output);
			                	}
   						}); 
   	 					alert("total : " + totalData);
   	 					paging_search(totalData, dataPerPage, pageCount, currentPage);
			            
	 				}
	            		else {
	            			var outputnull = "<div class='community_ncontainer'>";
   							outputnull += "<div>검색 결과가 없습니다.</div>";
   							outputnull += "</div>";
   							$('#community_data').append(outputnull);
   						}
   					},
   	              error : function(data){
   	            		alert('검색 실패');
	            }
	        }); //ajax
		}

		
	
		 //날짜 format
        function date_format(format) {
            var year = format.getFullYear();
            var month = format.getMonth()+1;
            var hour = format.getHours();
            var min = format.getMinutes();
            
            if(month<10) {
               month = '0' + month;
            }
            var date = format.getHours();
            if(hour<10) {
               hour = '0' + hour;
            }
            var min = format.getMinutes();
            if(min<10) {
               min = '0' + min;
            }
            return year + "-" + month + "-" + date + "-" + hour +":" + min;
         }
		 
	
        /**********************************************************************************************************
         ** 페이징 **
       **********************************************************************************************************/
        function paging(totalData, dataPerPage, pageCount, currentPage) {
        	alert('출력할 totaldata : '+totalData); //333333
        	/* $(".paginate").empty();  */
            var totalPageDevide = totalData / dataPerPage;
            var pageGroupDevide = currentPage / pageCount;

            var totalPage = Math.ceil(totalPageDevide);    // 총 페이지 수 1
            var pageGroup = Math.ceil(pageGroupDevide);    // 페이지 그룹 0
            
            var last = pageGroup * pageCount; //0

            if (last > totalPage) // 0 > 1
                last = totalPage;
            
            var first = last - (pageCount - 1); // 0 - (5 - 1)
            
            if (first <= 0) {
                first = 1; //
            }
            var next = last + 1; // 다음 1
            var prev = first - 1; // 이전 0
            var one = 1; // 맨 처음 
            var lastNo = totalPage; // 맨 끝 1

            var html = "";

            if (prev > 0) {
                html += "<a href=# id='one'>&lt;&lt;&nbsp;&nbsp;</a> ";
                html += "<a href=# id='prev'>&lt;&nbsp;&nbsp;</a> ";

            }
            
            for (var i = first; i <= last; i++) {
            	alert("페이징 만드는중");
                //html += "<a href='#' id=" + i + ">" + i + "</a> ";
                html += "<a href='javascript:selectData(totalData, dataPerPage, pagecount, " + i + ")' id=" + i + ">" + i + "</a> ";
                //html += "<a href='javascript:snsData(0, 6, 10, " + i + ")' id=" + i + ">" + i + "</a> ";
                
            }

            if(totalPage==0){
            	
            }else {
            	  if (last < totalPage) // 0 < 1
            	        html += "<a href=# id='next'>&gt;&nbsp;&nbsp;</a>";
            	        html += "<a href='javascript:void(0);' id='lastNo'>&gt;&gt;&nbsp;&nbsp;</a> ";

            	        $(".paginate").html(html);    // 페이지 목록 생성
            	        $(".paginate a").removeClass("page_on");

            	        $(".paginate a#" + currentPage).addClass("page_on"); // 현재 페이지 표시	
            }
          

            $(".paginate a").click(function () {
                var $item = $(this);
                var $id = $item.attr("id");
                var selectedPage = $item.text(); // 번호 클릭.

                if ($id == "one") selectedPage = one;
                if ($id == "prev") selectedPage = prev;
                if ($id == "next") selectedPage = next;
                if ($id == "lastNo") selectedPage = lastNo;
                
                alert(selectedPage + "페이지 이동");
                selectData(totalData, dataPerPage, pageCount, selectedPage);
                paging(totalData, dataPerPage, pageCount, selectedPage);// 페이징
            });
            
        }
             
	
        
      /**********************************************************************************************************
      ** 검색 페이징 **
      **********************************************************************************************************/
        function paging_search(totalData, dataPerPage, pageCount, currentPage) {
        	alert('검색 출력할 totaldata : '+totalData); //333333
        	/* $(".paginate").empty();  */
            var totalPageDevide = totalData / dataPerPage;
            var pageGroupDevide = currentPage / pageCount;

            var totalPage = Math.ceil(totalPageDevide);    // 총 페이지 수 1
            var pageGroup = Math.ceil(pageGroupDevide);    // 페이지 그룹 0
            
            var last = pageGroup * pageCount; //0

            if (last > totalPage) // 0 > 1
                last = totalPage;
            
            var first = last - (pageCount - 1); // 0 - (5 - 1)
            
            if (first <= 0) {
                first = 1; //
            }
            var next = last + 1; // 다음 1
            var prev = first - 1; // 이전 0
            var one = 1; // 맨 처음 
            var lastNo = totalPage; // 맨 끝 1

            var html = "";

            if (prev > 0) {
                html += "<a href=# id='one'>&lt;&lt;&nbsp;&nbsp;</a> ";
                html += "<a href=# id='prev'>&lt;&nbsp;&nbsp;</a> ";

            }
            
            for (var i = first; i <= last; i++) {
            	alert("페이징 만드는중");
                html += "<a href='javascript:searchData(totalData, dataPerPage, pagecount, " + i + ")' id=" + i + ">" + i + "</a> ";
                
            }

            if(totalPage==0){
            	
            }else {
            	  if (last < totalPage) // 0 < 1
            	        html += "<a href=# id='next'>&gt;&nbsp;&nbsp;</a>";
            	        html += "<a href='javascript:void(0);' id='lastNo'>&gt;&gt;&nbsp;&nbsp;</a> ";

            	        $(".paginate").html(html);    // 페이지 목록 생성
            	        $(".paginate a").removeClass("page_on");

            	        $(".paginate a#" + currentPage).addClass("page_on"); // 현재 페이지 표시	
            }
          

            $(".paginate a").click(function () {
                var $item = $(this);
                var $id = $item.attr("id");
                var selectedPage = $item.text(); // 번호 클릭.

                if ($id == "one") selectedPage = one;
                if ($id == "prev") selectedPage = prev;
                if ($id == "next") selectedPage = next;
                if ($id == "lastNo") selectedPage = lastNo;
                
                alert(selectedPage + "이동 ???");
                searchData(totalData, dataPerPage, pageCount, selectedPage);
                paging_search(totalData, dataPerPage, pageCount, selectedPage);// 페이징
                	
            });
            
        }
             
	