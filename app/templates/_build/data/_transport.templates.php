<?php
/**
 * @package <%= _.slugify(name) %>
 * @subpackage build
 */
function getTemplateContent($filename) {
    $o = file_get_contents($filename);
    return $o;
}

$templates = array();
$templatesSource = array(
  /* put your templates here */
  /* 'templates' => array(
  	'description' => ''
  )*/
);

$i = 1;
foreach ($templatesSource as $key => $options) {
	$templates[$i]= $modx->newObject('modTemplate');
	$templates[$i]->fromArray(array(
	    'id' => $i,
	    'templatename' => $key,
	    'description' => $options['description'],
	    'content' => getTemplateContent($sources['elements'].'templates/' . $key . '.html'),
	),'',true,true);
	<% if (pkgPropertySets) { %>
	$properties = include $sources['data'].'properties/properties.<%= _.slugify(name) %>.php';
	$chunks[$i]->setProperties($properties);
	<% } %>
	$o = getTemplateContent($sources['elements'].'templates/' . $key . '.html');
	//echo "\n\n\n$key\n$o";
	<% if (pkgPropertySets) { %>
	unset($properties);
	<% } %>
	$i++;
}
return $templates;

