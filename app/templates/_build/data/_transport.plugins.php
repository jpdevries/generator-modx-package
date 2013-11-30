<?php
/**
 * @package <%= _.slugify(name) %>
 * @subpackage build
 */
function getPluginContent($filename) {
    $o = file_get_contents($filename);
    return $o;
}

$plugins = array();
$pluginsSource = array(
  /* put your plugins here */
  /* 'myplugin' => array(
  	'description' => ''
  )*/
);

$i = 1;
foreach ($pluginsSource as $key => $options) {
	$plugins[$i]= $modx->newObject('modPlugin');
	$plugins[$i]->fromArray(array(
	    'id' => $i,
	    'name' => $key,
	    'description' => $options['description'],
	    'snippet' => getPluginContent($sources['elements'].'plugins/' . $key . '.php'),
	),'',true,true);
	<% if (pkgPropertySets) { %>
	$properties = include $sources['data'].'properties/properties.<%= _.slugify(name) %>.php';
	$chunks[$i]->setProperties($properties);
	<% } %>
	$o = getPluginContent($sources['elements'].'plugins/' . $key . '.php');
	//echo "\n\n\n$key\n$o";
	<% if (pkgPropertySets) { %>
	unset($properties);
	<% } %>
	$i++;
}
return $plugins;

