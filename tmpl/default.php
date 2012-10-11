<?php
/**
 * @package		Joomla.Site
 * @subpackage	mod_random_image
 * @copyright	Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;
?>
<div class="fb_gallery<?php echo $moduleclass_sfx ?>">
<?php if ($photos) : ?>
	<ul>
		<?php foreach( $photos as $photo ) : ?>
			<li><a href="<?php echo $photo['big']; ?>" class="fbg_items"><img src="<?php echo $photo['small']; ?>" /></a></li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>
</div>
