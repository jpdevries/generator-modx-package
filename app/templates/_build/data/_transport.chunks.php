<?php
/**
 * @package <%= _.slugify(name) %>
 * @subpackage build
 */
function getChunkContent($filename) {
    $o = file_get_contents($filename);
    return $o;
}

$chunks = array();
$chunksSource = array(
  /* put your chunks here */
  /* 'mychunk' => array(
  	'description' => ''
  )*/
);

$i = 1;
foreach ($chunksSource as $key => $options) {
	$chunks[$i]= $modx->newObject('modChunk');
	$chunks[$i]->fromArray(array(
	    'id' => $i,
	    'name' => $key,
	    'description' => $options['description'],
	    'snippet' => getChunkContent($sources['elements'].'chunks/' . $key . '.html'),
	),'',true,true);
	<% if (pkgPropertySets) { %>
	$properties = include $sources['data'].'properties/properties.<%= _.slugify(name) %>.php';
	$chunks[$i]->setProperties($properties);
	<% } %>
	$o = getChunkContent($sources['elements'].'chunks/' . $key . '.html');
	//echo "\n\n\n$key\n$o";
	<% if (pkgPropertySets) { %>
	unset($properties);
	<% } %>
	$i++;
}
return $chunks;

