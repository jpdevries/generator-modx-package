'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var pathNames;

var MODXPackageGenerator = module.exports = function MODXPackageGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  /*this.on('end', function () {
    this.installDependencies({
	  skipInstall: options['skip-install'],
	  callback: function() {
		this.emit('dependenciesInstalled');
	  }.bind(this)
    });
  });*/

  /*this.on('dependenciesInstalled', function() {
      this.spawnCommand('grunt', ['build']);
  });*/

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  pathNames = this.destinationRoot().split(path.sep);
  console.log(this.destinationRoot());
};

util.inherits(MODXPackageGenerator, yeoman.generators.Base);

MODXPackageGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
	name : 'name',
	message : 'What would you like to name your Add-on?',
	default : function(props) {
      return pathNames[pathNames.length-1];
	}
  },
  {
    name : 'description',
	message : 'How would you describe this manager theme?',
    default : 'The best MODX Add-on ever made!'
  },
  {
    name : 'versionNo',
	message : 'What is the version number of your package?',
    default : '0.0.0'
  },
  {
    name : 'pkgRelease',
    type:'list',
	message : 'Choose a release type for your package.',
	choices: ['alpha','beta','pl','Other...'],
    default : 'pl'
  },
  {
    type : 'checkbox',
    name : 'pkgElements',
    message : 'Use spacebar and arrow keys to select the elements you \'d like to package',
    choices : [{
      name : 'Templates',
      checked : false
    },
	{
      name : 'Chunks',
      checked : false
    },
	{
      name : 'Snippets',
      checked : false
    },
	{
      name : 'Plugins',
      checked : false
    },
	{
      name : 'Property Sets',
      checked : false
    }]
  },
  {
	type:'confirm',
    name : 'pkgAssets',
	message : 'Will you be including assets with your package?',
    default : true
  },
  {
	type:'confirm',
    name : 'createConfig',
	message : 'Would you like to create a config file now? You\'ll need to supply a path to a MODX install.',
    default : false
  },
  {
    name : 'modxPath',
	message : 'Enter the absolute path to your MODX install',
	when : function(props) {
      return props.createConfig;
    },
    validate : function(props) {
	  return true;
    }
  },
  {
    name : 'modxUrl',
	message : 'Enter the absolute URL to your MODX install',
	when : function(props) {
      return props.createConfig;
    },
    validate : function(props) {
	  return true;
    }
  },
  {
    name : 'configKey',
	message : 'Optionally set a unique config key',
	when : function(props) {
      return props.createConfig;
    },
    default : 'config'
  },
  {
    type:'confirm',
    name:'enterAuthor',
    message:'Would you like to enter some author and project related info?',
    default:true
},
  {
	name : 'authorName',
	message : 'Author name',
	default : '',
    when : function(props) {
      return props.enterAuthor;
    }
  },
  {
	name : 'authorEmail',
	message : 'Author email',
	default : '',
    when : function(props) {
      return props.enterAuthor;
    }
  },
  {
	name : 'authorUrl',
	message : 'Author url',
	default : '',
    when : function(props) {
      return props.enterAuthor;
    }
  },
  {
	name : 'gitRepo',
	message : 'Project git repository',
	default : function(props) {
		return (props.enterAuthor && props.authorName) ? 'git://github.com/' + _s.slugify(props.authorName.replace(/ /g,'')) + '/' + _s.slugify(props.name) + '.git' : ''
	},
    when : function(props) {
      return props.enterAuthor;
    }
  },
  {
	name : 'gitIssues',
	message : 'Project issues tracker',
	default : function(props) {
		if(!props.gitRepo) return '';
		var _s = props.gitRepo;
		_s = _s.substring(0,_s.length-4);
		return _s.replace('git://','https://') + '/issues';
	},
    when : function(props) {
      return props.gitRepo && props.gitRepo.length > 0;
    }
  }
];

  this.prompt(prompts, function (props) {
	var _d = new Date();
	this.createdOn = _d.getFullYear() + '-' + (_d.getMonth() + 1) + '-' + _d.getDate();
    this.name = props.name;
    this.slug = _s.slugify(props.name);
    this.description = props.description;
    this.versionNo = props.versionNo;
    this.pkgRelease = props.pkgRelease;
    this.createConfig = props.createConfig;
    this.modxPath = (props.modxPath) ? ((props.modxPath.slice(-1) == '/') ? props.modxPath : props.modxPath + '/') : '';
    this.modxUrl = (props.modxUrl) ? ((props.modxUrl.slice(-1) == '/') ? props.modxUrl : props.modxUrl + '/') : '';
    this.configKey = props.configKey;
    this.pkgElements = props.pkgElements;
    this.pkgAssets = props.pkgAssets;
    this.pkgTemplates = (this.pkgElements.indexOf('Templates') != -1) ? true : false;
    this.pkgChunks = (this.pkgElements.indexOf('Chunks') != -1) ? true : false;
    this.pkgSnippets = (this.pkgElements.indexOf('Snippets') != -1) ? true : false;
    this.pkgPlugins = (this.pkgElements.indexOf('Plugins') != -1) ? true : false;
    this.pkgPropertySets = (this.pkgElements.indexOf('Property Sets') != -1) ? true : false;
    this.pkgSettings = (this.pkgElements.indexOf('System Settings') != -1) ? true : false;
    this.authorName = props.authorName;
    this.authorEmail = props.authorEmail;
    this.authorUrl = props.authorUrl;
    this.gitRepo = props.gitRepo;
    this.gitIssues = props.gitIssues;
    cb();
  }.bind(this));
};

MODXPackageGenerator.prototype.app = function app() {
  this.mkdir('_build');
  this.mkdir('_build/data');
  if(this.pkgAssets) {
    this.mkdir('assets');
    this.mkdir('assets/components');
    this.mkdir('assets/components/' + this.slug);
  }
  if(this.pkgPropertySets) {
    this.mkdir('_build/data/properties');
    this.template('core/components/properties/_properties.php','_build/data/properties/properties.' + this.slug + '.php');
  }
  this.mkdir('core');
  this.mkdir('core/components');
  this.mkdir('core/components/' + this.slug);
  this.mkdir('core/components/' + this.slug + '/docs');
  this.mkdir('core/components/' + this.slug + '/elements');
  if(this.pkgTemplates) {
    this.mkdir('core/components/' + this.slug + '/elements/templates');
    this.template('_build/data/_transport.templates.php','_build/data/transport.templates.php');
  }
  if(this.pkgChunks) {
    this.mkdir('core/components/' + this.slug + '/elements/chunks');
    this.template('_build/data/_transport.chunks.php','_build/data/transport.chunks.php');
  }
  if(this.pkgSnippets) {
    this.mkdir('core/components/' + this.slug + '/elements/snippets');
    this.template('_build/data/_transport.snippets.php','_build/data/transport.snippets.php');
  }
  if(this.pkgPlugins) {
    this.mkdir('core/components/' + this.slug + '/elements/plugins');
    this.template('_build/data/_transport.plugins.php','_build/data/transport.plugins.php');
  }
  if(this.pkgSettings) {
    this.template('_build/data/_transport.settings.php','_build/data/transport.settings.php');
  }
  this.mkdir('core/components/' + this.slug + '/lexicon');
  this.mkdir('core/components/' + this.slug + '/lexicon/en');

  this.template('core/components/docs/readme.txt','core/components/' + this.slug + '/docs/readme.txt');
  this.template('core/components/docs/changelog.txt','core/components/' + this.slug + '/docs/changelog.txt');
  this.template('core/components/docs/license.txt','core/components/' + this.slug + '/docs/license.txt');
  if(this.createConfig) this.template('_build/_build.config.php','_build/build.config.php'); 
  this.template('_build/_build.transport.php','_build/build.transport.php'); 
  this.template('_build/_build.config.sample.php','_build/build.config.sample.php');

};

MODXPackageGenerator.prototype.projectfiles = function projectfiles() {
  //this.copy('editorconfig', '.editorconfig');
  //this.copy('jshintrc', '.jshintrc');
};
