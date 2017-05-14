
			$(document).ready(function() {
				$(".salary").hide();
				$("#line2").hide();
				$('input[type=range]').on('input', function(e){
				  var min = e.target.min,
					  max = e.target.max,
					  val = e.target.value;
				  
				  $(e.target).css({
					'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
				  });
				}).trigger('input');
				
					var val1 = $('input[name=range-min]').val();
					document.getElementById("range-min").innerHTML = val1+" zł";
					
					var val2 = $('input[name=range-max]').val();
					document.getElementById("range-max").innerHTML = val2+" zł";
			});
			
			function showMin(newValue)
			{
				document.getElementById("range-min").innerHTML=newValue+" zł";
			}
			function showMax(newValue)
			{
				document.getElementById("range-max").innerHTML=newValue+" zł";
			}
            
			function showCategoryView()
			{
				$(".salary").hide();
				$("#nav_salary").removeClass("bold");
				$("#nav_category").addClass("bold");
				$("#line2").hide();
				$("#line1").show();
				$(".category").show(1000);
				//$(".salary").show(1000);
			}
			function showSalaryView()
			{
				$(".category").hide();
				$("#nav_category").removeClass("bold");
				$("#nav_salary").addClass("bold");
				$("#line1").hide();
				$("#line2").show();
				$(".salary").show(1000);
				//$(".salary").show(1000);
			}
            
