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

app.views.activityListIcon = 
"<ul data-role='listview' data-icon='false'>\
	{{#activities}}\
	<li>\
		<a href='#activity/{{activityId}}'>\
			<div class='{{activityClass}}'>\
				<div class='ico_act'>\
		        	<img src='img/iconos/{{activityType}}/64/{{activityType}}.png'>\
				</div>\
				<div class='content_act'>\
					<h5>{{activityName}}</h5>\
		    		<h6 class='desc'>{{description}}</h6>\
				</div>\
			</div>\
		</a>\
	</li>\
	{{/activities}}\
</ul>";








