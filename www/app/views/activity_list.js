app.views.activityList = 
"<div data-role='header' class='{{headerClass}}'>\
	<h1>{{headerName}}</h1>\
	<a data-theme='' data-iconshadow='false' data-shadow='false' data-iconpos='notext' data-icon='main' href='index.html#left-panel'>Menu</a>\
</div>\
<div data-role='panel' id='left-panel' class='left-panel'></div>\
<div data-role='content'>\
	<div class='all_act'>\
		<ul data-role='listview' data-icon='false'>\
			{{#activities}}\
			<li>\
				<a href='#activity/{{activityId}}'>\
					<div class='item_cnt'>\
						<h5 class='{{activityClass}}'>{{activityName}}</h5>\
			    		<p class='desc'>{{description}}</p>\
					</div>\
				</a>\
			</li>\
			{{/activities}}\
		</ul>\
	</div>\
</div>";










