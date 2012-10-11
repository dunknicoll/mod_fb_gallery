function ADFBGallery( link_class )
{
	if( $$( link_class ) )
	{
		this.items = $$( link_class );
		this.count = this.items.length;
		this.pointer = 0;

		this.shade = {};
		this.outer = {};
		this.inner = {};
		this.full = {};
		this.controls = {};
		this.cnext = {};
		this.cprev = {};
		this.closebutton = {};

		this._init();
	}
}

ADFBGallery.prototype._init = function()
{
	this._createElements();
	this._createEvents();
}

ADFBGallery.prototype._indexInArray = function(arr,val){
	for(var i=0;i<arr.length;i++) if(arr[i]==val) return i;
	return -1;
}

ADFBGallery.prototype._createElements = function(){
	if( $('adfb_shade') )
	{
		this.shade = $('adfb_shade');
	}
	else
	{
		this.shade = new Element('div#adfb_shade');
	}

	this.inner = new Element('div#adfb_inner');
	this.outer = new Element('div#adfb_outer');
	this.controls = new Element('div#adfb_controls');
	this.cprev = new Element('div#adfb_previous');
	this.cnext = new Element('div#adfb_next');
	this.closebutton = new Element('div#adfb_close');
	this.spinner = new Element('div#adfb_spinner');
	this.full = new Element('img');

	this.cprev.inject( this.controls );
	this.cnext.inject( this.controls );

	this.full.inject( this.inner );

	this.closebutton.inject( this.outer );

	this.inner.inject( this.outer );

	this.controls.inject( this.outer );

	this.outer.inject( this.spinner );

	this.spinner.inject( this.shade );

	this.shade.inject( document.body );
}

ADFBGallery.prototype._createEvents = function(){
	var self = this;

	this.closebutton.addEvent('click',function(e){
		e.stopPropagation();
		self._close();
	});

	this.cnext.addEvent('click',function(e){
		e.stopPropagation();
		self.pointer++;
		if(self.pointer>self.count-1) self.pointer=0;
		self._switchItem(self.pointer);
	});

	this.cprev.addEvent('click',function(e){
		e.stopPropagation();
		self.pointer--;
		if(self.pointer<0) self.pointer=self.count-1;
		self._switchItem(self.pointer);
	});

	this.full.addEvent('load',function(){

		var size = this.measure(function(){
			return this.getSize();
		});

		var top = (window.getSize().y/2)-(size.y/2);
		var right = (window.getSize().x/2)-(size.x/2);
		var middle = (window.getSize().y/2);

		self.outer.setStyle('width',size.x+30);
		self.outer.setStyle('margin-top',top-15);

		self.inner.setStyle('width',size.x+30);

		self.closebutton.setStyle('top',top-30);
		self.closebutton.setStyle('right',right-30)

		self.controls.setStyle('width',size.x+30);
		self.controls.setStyle('top',middle-18 );

		$('adfb_outer').setStyle('visibility','visible');
	});

	this.items.addEvent('click',function(e){

		e.preventDefault();
		e.stopPropagation();

		self.pointer = self._indexInArray(self.items,this);

		self._open();

		self._switchItem(self.pointer);

	});

	this.shade.addEvent('click',function(e){
		e.stopPropagation();
		self._close();
	});
}

ADFBGallery.prototype._close = function(){
	this.shade.hide();
}

ADFBGallery.prototype._open = function(){
	this.shade.show();
}

ADFBGallery.prototype._switchItem = function(pid)
{
	var item = this.items[pid];

	$('adfb_outer').setStyle('visibility','hidden');

	this.full.set('src',item.get('href'));
}

var initEvent = window.webkit ? 'load' : 'domready';
window.addEvent(initEvent, function()
{
	new ADFBGallery('.fbg_items');
});