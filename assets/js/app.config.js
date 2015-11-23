/*         ______________________________________
  ________|                                      |_______
  \       |           SmartAdmin WebApp          |      /
   \      |      Copyright © 2014 MyOrange       |     /
   /      |______________________________________|     \
  /__________)                                (_________\

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * =======================================================================
 * SmartAdmin is FULLY owned and LICENSED by MYORANGE INC.
 * This script may NOT be RESOLD or REDISTRUBUTED under any
 * circumstances, and is only to be used with this purchased
 * copy of SmartAdmin Template.
 * =======================================================================
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * =======================================================================
 * original filename: app.config.js
 * filesize: ??
 * author: Sunny (@bootstraphunt)
 * email: info@myorange.ca
 * =======================================================================
 *
 * APP CONFIGURATION (HTML/AJAX/PHP Versions ONLY)
 * Description: Enable / disable certain theme features here
 * GLOBAL: Your left nav in your app will no longer fire ajax calls, set 
 * it to false for HTML version
 */	
	$.navAsAjax = true; 
/*
 * GLOBAL: Sound Config
 */
	$.sound_path = "sound/";
	$.sound_on = true; 
/*
 * Impacts the responce rate of some of the responsive elements (lower 
 * value affects CPU but improves speed)
 */
	var throttle_delay = 350,
/*
 * The rate at which the menu expands revealing child elements on click
 */
	menu_speed = 235,	
/*
 * Turn on JarvisWidget functionality
 * dependency: js/jarviswidget/jarvis.widget.min.js
 */
	enableJarvisWidgets = true,
/*
 * Warning: Enabling mobile widgets could potentially crash your webApp 
 * if you have too many widgets running at once 
 * (must have enableJarvisWidgets = true)
 */
	enableMobileWidgets = false,	
/*
 * Turn on fast click for mobile devices?
 * Enable this to activate fastclick plugin
 * dependency: js/plugin/fastclick/fastclick.js 
 */
	fastClick = false,
/*
 * These elements are ignored during DOM object deletion for ajax version 
 * It will delete all objects during page load with these exceptions:
 */
	ignore_key_elms = ["#header, #left-panel, #main, div.page-footer, #shortcut, #divSmallBoxes, #divMiniIcons, #divbigBoxes, #voiceModal, script"],
/*
 * VOICE COMMAND CONFIG
 * dependency: voicecommand.js
 */
	voice_command = true,
/*
 * Turns on speech without asking
 */	
	voice_command_auto = false,
/*
 * 	Sets the language to the default 'en-US'. (supports over 50 languages 
 * 	by google)
 * 
 *  Afrikaans         ['af-ZA']
 *  Bahasa Indonesia  ['id-ID']
 *  Bahasa Melayu     ['ms-MY']
 *  Català            ['ca-ES']
 *  Čeština           ['cs-CZ']
 *  Deutsch           ['de-DE']
 *  English           ['en-AU', 'Australia']
 *                    ['en-CA', 'Canada']
 *                    ['en-IN', 'India']
 *                    ['en-NZ', 'New Zealand']
 *                    ['en-ZA', 'South Africa']
 *                    ['en-GB', 'United Kingdom']
 *                    ['en-US', 'United States']
 *  Español           ['es-AR', 'Argentina']
 *                    ['es-BO', 'Bolivia']
 *                    ['es-CL', 'Chile']
 *                    ['es-CO', 'Colombia']
 *                    ['es-CR', 'Costa Rica']
 *                    ['es-EC', 'Ecuador']
 *                    ['es-SV', 'El Salvador']
 *                    ['es-ES', 'España']
 *                    ['es-US', 'Estados Unidos']
 *                    ['es-GT', 'Guatemala']
 *                    ['es-HN', 'Honduras']
 *                    ['es-MX', 'México']
 *                    ['es-NI', 'Nicaragua']
 *                    ['es-PA', 'Panamá']
 *                    ['es-PY', 'Paraguay']
 *                    ['es-PE', 'Perú']
 *                    ['es-PR', 'Puerto Rico']
 *                    ['es-DO', 'República Dominicana']
 *                    ['es-UY', 'Uruguay']
 *                    ['es-VE', 'Venezuela']
 *  Euskara           ['eu-ES']
 *  Français          ['fr-FR']
 *  Galego            ['gl-ES']
 *  Hrvatski          ['hr_HR']
 *  IsiZulu           ['zu-ZA']
 *  Íslenska          ['is-IS']
 *  Italiano          ['it-IT', 'Italia']
 *                    ['it-CH', 'Svizzera']
 *  Magyar            ['hu-HU']
 *  Nederlands        ['nl-NL']
 *  Norsk bokmål      ['nb-NO']
 *  Polski            ['pl-PL']
 *  Português         ['pt-BR', 'Brasil']
 *                    ['pt-PT', 'Portugal']
 *  Română            ['ro-RO']
 *  Slovenčina        ['sk-SK']
 *  Suomi             ['fi-FI']
 *  Svenska           ['sv-SE']
 *  Türkçe            ['tr-TR']
 *  български         ['bg-BG']
 *  Pусский           ['ru-RU']
 *  Српски            ['sr-RS']
 *  한국어          ['ko-KR']
 *  中文                            ['cmn-Hans-CN', '普通话 (中国大陆)']
 *                    ['cmn-Hans-HK', '普通话 (香港)']
 *                    ['cmn-Hant-TW', '中文 (台灣)']
 *                    ['yue-Hant-HK', '粵語 (香港)']
 *  日本語                         ['ja-JP']
 *  Lingua latīna     ['la']
 */
	voice_command_lang = 'en-US',
/*
 * 	Use localstorage to remember on/off (best used with HTML Version)
 */	
	voice_localStorage = false;
/*
 * Voice Commands
 * Defines all voice command variables and functions
 */	
 	if (voice_command) {
	 		
		var commands = {
					
			'show dashboard' : function() { window.location.hash = "dashboard" },
			'show inbox' : function() {  window.location.hash = "inbox" },
			'show graphs' : function() {  window.location.hash = "graphs/flot" },
			'show flotchart' : function() { window.location.hash = "graphs/flot" },
			'show morris chart' : function() { window.location.hash = "graphs/morris" },
			'show inline chart' : function() { window.location.hash = "graphs/inline-charts" },
			'show dygraphs' : function() { window.location.hash = "graphs/dygraphs" },
			'show tables' : function() { window.location.hash = "tables/table" },
			'show data table' : function() { window.location.hash = "tables/datatable" },
			'show jquery grid' : function() { window.location.hash = "tables/jqgrid" },
			'show form' : function() { window.location.hash = "forms/form-elements" },
			'show form layouts' : function() { window.location.hash = "forms/form-templates" },
			'show form validation' : function() { window.location.hash = "forms/validation" },
			'show form elements' : function() { window.location.hash = "forms/bootstrap-forms" },
			'show form plugins' : function() { window.location.hash = "forms/plugins" },
			'show form wizards' : function() { window.location.hash = "forms/wizards" },
			'show bootstrap editor' : function() { window.location.hash = "forms/other-editors" },
			'show dropzone' : function() { window.location.hash = "forms/dropzone" },
			'show image cropping' : function() { window.location.hash = "forms/image-editor" },
			'show general elements' : function() { window.location.hash = "ui/general-elements" },
			'show buttons' : function() { window.location.hash = "ui/buttons" },
			'show fontawesome' : function() { window.location.hash = "ui/icons/fa" },
			'show glyph icons' : function() { window.location.hash = "ui/icons/glyph" },
			'show flags' : function() { window.location.hash = "ui/icons/flags" },
			'show grid' : function() { window.location.hash = "ui/grid" },
			'show tree view' : function() { window.location.hash = "ui/treeview" },
			'show nestable lists' : function() { window.location.hash = "ui/nestable-list" },
			'show jquery U I' : function() { window.location.hash = "ui/jqui" },
			'show typography' : function() { window.location.hash = "ui/typography" },
			'show calendar' : function() { window.location.hash = "calendar" },
			'show widgets' : function() { window.location.hash = "widgets" },
			'show gallery' : function() { window.location.hash = "gallery" },
			'show maps' : function() { window.location.hash = "gmap-xml" },
			'go back' :  function() { history.back(1); }, 
			'scroll up' : function () { $('html, body').animate({ scrollTop: 0 }, 100); },
			'scroll down' : function () { $('html, body').animate({ scrollTop: $(document).height() }, 100);},
			'hide navigation' : function() { 
				if ($.root_.hasClass("container") && !$.root_.hasClass("menu-on-top")){
					$('span.minifyme').trigger("click");
				} else {
					$('#hide-menu > span > a').trigger("click"); 
				}
			},
			'show navigation' : function() { 
				if ($.root_.hasClass("container") && !$.root_.hasClass("menu-on-top")){
					$('span.minifyme').trigger("click");
				} else {
					$('#hide-menu > span > a').trigger("click"); 
				}
			},
			'mute' : function() {
				$.sound_on = false;
				$.smallBox({
					title : "MUTE",
					content : "All sounds have been muted!",
					color : "#a90329",
					timeout: 4000,
					icon : "fa fa-volume-off"
				});
			},
			'sound on' : function() {
				$.sound_on = true;
				$.speechApp.playConfirmation();
				$.smallBox({
					title : "UNMUTE",
					content : "All sounds have been turned on!",
					color : "#40ac2b",
					sound_file: 'voice_alert',
					timeout: 5000,
					icon : "fa fa-volume-up"
				});
			},
			'stop' : function() {
				smartSpeechRecognition.abort();
				$.root_.removeClass("voice-command-active");
				$.smallBox({
					title : "VOICE COMMAND OFF",
					content : "Your voice commands has been successfully turned off. Click on the <i class='fa fa-microphone fa-lg fa-fw'></i> icon to turn it back on.",
					color : "#40ac2b",
					sound_file: 'voice_off',
					timeout: 8000,
					icon : "fa fa-microphone-slash"
				});
				if ($('#speech-btn .popover').is(':visible')) {
					$('#speech-btn .popover').fadeOut(250);
				}
			},
			'help' : function() {
				$('#voiceModal').removeData('modal').modal( { remote: "ajax/modal-content/modal-voicecommand.html", show: true } );
				if ($('#speech-btn .popover').is(':visible')) {
					$('#speech-btn .popover').fadeOut(250);
				}
			},		
			'got it' : function() {
				$('#voiceModal').modal('hide');
			},	
			'logout' : function() {
				$.speechApp.stop();
				window.location = $('#logout > span > a').attr("href");
			}
		}; 
		
	};
/*
 * END APP.CONFIG
 */
 
 
 
 
 
 	