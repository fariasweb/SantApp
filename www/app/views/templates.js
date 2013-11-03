app.views.menu = 
"<div class='ui-panel-inner'>\
  <div class='p_logo'>\
    <img src='img/iconos/logo_ayu.png'>\
  </div>\
  <ul data-role='listview' class='ui-listview'>\
    <li data-role='list-divider'>Búsqueda</li>\
  </ul>\
  <div data-role='collapsible-set' data-inset='false' data-iconpos='left'>\
    <div data-role='collapsible' data-expanded-icon='aprin' data-collapsed-icon='aprin' class='aprin'>\
      <h3>Agenda principal</h3>\
      <ul data-role='listview' data-icon='false'>\
        <li><a href='#diary/today'>Avui</a></li>\
        <li><a href='#diary/week'>Aquesta setmana</a></li>\
        <li><a href='#diary/month'>Aquest mes</a></li>\
        <li><a href='#diary/all'>Totes</a></li>\
      </ul>\
    </div>\
  </div>\
  <ul data-role='listview' data-theme='d' data-icon='false' class='ful'>\
    <li class='infr'><a class='infr' href='#equipment'><img class='ui-li-icon' src='img/iconos/infraestructures/32/infraestructures.png'>Infraestructures</a></li>\
    <li data-role='list-divider'>Agenda</li>\
  </ul>\
  <div data-role='collapsible-set' data-inset='false' data-iconpos='left' >\
    {{#diary}}\
    <div data-role='collapsible' data-collapsed-icon='{{diaryIcon}}' data-expanded-icon='{{diaryIcon}}' class='{{diaryClass}}'>\
      <h3>{{diaryName}}</h3>\
      <ul data-role='listview' data-icon='false'>\
        <li><a href='#category/{{diaryId}}/0'>Ver todas</a></li>\
        {{#cats}}\
          <li><a href='#category/{{diaryId}}/{{catId}}'>{{catName}}</a></li>\
        {{/cats}}\
      </ul>\
    </div>\
    {{/diary}}\
  </div>\
  <ul data-role='listview' data-icon='false' class='lastul'>\
    <li data-role='list-divider'>Opcions</li>\
    <li class='config'><a href='#config'><img class='ui-li-icon' src='img/iconos/Navegacion/32/configuracio.png'>Configuració</a></li>\
  </ul>\
</div>";

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

app.views.btnMore =
"<div class='vermas'>\
	<img src='img/iconos/Navegacion/32/vermasc.png'>\
</div>";