<?php
/**
 * @package <%= _.slugify(name) %>
 * @subpackage build
 */
function getSnippetContent($filename) {
    $o = file_get_contents($filename);
    return $o;
}

$snippets = array();
$snippetsSource = array(
  /* put your snippets here */
  /* 'mysnippet' => array(
  	'description' => ''
  )*/
);

$i = 1;
foreach ($snippetsSource as $key => $options) {
	$snippets[$i]= $modx->newObject('modSnippet');
	$snippets[$i]->fromArray(array(
	    'id' => $i,
	    'name' => $key,
	    'description' => $options['description'],
	    'snippet' => getSnippetContent($sources['elements'].'snippets/' . $key . '.php'),
	),'',true,true);
	<% if (pkgPropertySets) { %>
	$properties = include $sources['data'].'properties/properties.<%= _.slugify(name) %>.php';
	$snippets[$i]->setProperties($properties);
	<% } %>
	$o = getSnippetContent($sources['elements'].'snippets/' . $key . '.php');
	//echo "\n\n\n$key\n$o";
	<% if (pkgPropertySets) { %>
	unset($properties);
	<% } %>
	$i++;
}
return $snippets;

