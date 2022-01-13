const domain = 'localist.risd.systems'

const processArgv = (argv) => {
  return {
    'site_url': argv.cloud
      ? `https://${ makeBranchBasedSiteName(domain, gitBranch()) }` 
      : '.',
  }
}

module.exports = processArgv

function gitBranch () {
  try {
    var branch = require( 'git-state' ).branchSync()
    return branch;
  }
  catch ( noGitError ) {
    throw new Error( 'Must be within a git repository.' )
  }
}

function makeBranchBasedSiteName ( domain, branch ) {
  return branch === 'master' || branch === 'main'
    ? domain
    : [ branchAsSubdomain( branch ), domain ].join( '.' )
}

function branchAsSubdomain ( branch ) {
  return branch
    .replace( /^release\//g, '' )   // release/r-15 -> r-15
    .replace( /^feature\//g, 'f-' ) // feature/firebase-upgrade -> f-firebase-upgrade
    .replace( /^hotfix\//g,  'h-' ) // hotfix/template-patch -> h-template-patch
    .replace( /\//g, '-' )          // replace '/' with '-'
    .replace( /\+/g, '-' )          // replace '+' with '-'
}
