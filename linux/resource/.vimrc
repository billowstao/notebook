" Configuration file for vim
set modelines=0		" CVE-2007-2438

" Normally we use vim-extensions. If you want true vi-compatibility
" remove change the following statements
set nocompatible	" Use Vim defaults instead of 100% vi compatibility
set backspace=2		" more powerful backspacing

" Don't write backup file if vim is being called by "crontab -e"
au BufWrite /private/tmp/crontab.* set nowritebackup nobackup
" Don't write backup file if vim is being called by "chpass"
au BufWrite /private/etc/pw.* set nowritebackup nobackup

let skip_defaults_vim=1

" https://vimconfig.com
" encoding
set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936
set termencoding=utf-8
set encoding=utf-8
" display
syntax on
set number
set showbreak=+++ " Wrap-broken line prefix
set linebreak " Break lines at word
set textwidth=200 "break lines word
set showmatch " Highlight matching brace
set spell " Enable spell-checking
set visualbell " Use visual bell (no beeping)
" window
set ruler " show row and column ruler information
" mouse
set cursorline
set cul
set mouse=a
set selection=exclusive
set selectmode=mouse,key
" search
set hlsearch " Highlight all search results
set smartcase " Enable smart-case search
set ignorecase " Always case-insensitive
set incsearch " Searches for strings incrementally
" edit
set paste
set autoindent " Auto-indent new lines
set expandtab " Use spaces instead of tabs
set shiftwidth=4 " Number of auto-indent spaces
set smartindent " Enable smart-indent
set smarttab " Enable smart-tabs
set softtabstop=4 " Number of spaces per Tab
set laststatus=2
set undolevels=1000 " Number of undo levels
" plugin
filetype plugin indent on
autocmd BufWritePost $MYVIMRC source $MYVIMRC
