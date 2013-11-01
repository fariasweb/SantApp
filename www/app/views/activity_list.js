app.views.activityList = 
"<div class='all_act'>\
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
</div>";










