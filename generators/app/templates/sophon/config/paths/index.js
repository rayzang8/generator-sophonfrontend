import path from 'path';

function paths() {
    this.root = path.resolve(path.join(__dirname), '../../');
    this.src = path.join(this.root, 'src');
    this.styleLintConfig = path.join(this.root, 'stylelint.config.js');
    this.srcIndexEntry = path.join(this.src, 'index.tsx');
    this.srcScss = path.join(this.src, 'assets', 'scss');
    this.srcScssEntry = path.join(this.srcScss, 'app.scss');
    this.srcScssVendorEntry = path.join(this.srcScss, 'vendor.scss');
    
    this.dst = path.join(this.root, 'dist');
    
    this.config = path.join(this.root, 'config');
    this.configHtmlTemplates = path.join(this.config, 'public');
    this.configHtmlTemplatesLocalIndex = path.join(this.configHtmlTemplates, 'index.html');

    this.nodemodules = path.join(this.root, 'node_modules');    
}

export default new paths();


