<?php
/**
 * @package		Joomla.Site
 * @subpackage	mod_random_image
 * @copyright	Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

class modFbGalleryHelper
{
	static function getPhotos(&$params)
	{
		$fbg_id = $params->get('fbg_id');

		$limit = $params->get('fbg_limit');

		$url = "https://graph.facebook.com/" . $fbg_id . "/photos";

    	$data = file_get_contents( $url );

    	$images = array();

    	if( $data )
    	{
    		$data = json_decode( $data );

    		if( count( $data->data )>0 )
    		{	
    			$i = 0;

	    		foreach($data->data as $photo)
	    		{
	    			if($limit !='' && $i==$limit)
	    			{
	    				break;
	    			}
	    			$images[] = array('big'=>$photo->images[1]->source, 'small'=>$photo->images[8]->source);
	    			$i++;
	    		}

	    		return $images;

	    	}
	    	else
	    	{
	    		return false;
	    	}
    	}
	}
}
