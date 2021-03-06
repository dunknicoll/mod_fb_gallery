<?php
/**
 * @package		Joomla.Site
 * @subpackage	mod_random_image
 * @copyright	Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

// Include the syndicate functions only once
require_once dirname(__FILE__).'/helper.php';

$photos	= modFbGalleryHelper::getPhotos($params);

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));

$document = JFactory::getDocument();
$document->addStyleSheet(JURI::base().'modules/mod_fb_gallery/assets/fb_gallery.css');
$document->addScript(JURI::base().'modules/mod_fb_gallery/assets/fb_gallery.js');

require JModuleHelper::getLayoutPath('mod_fb_gallery', $params->get('layout', 'default'));
