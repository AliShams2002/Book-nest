const Footer = () => {
  const columns = [
    {
      title: 'Shop',
      links: [
        'All Books',
        'Bestsellers',
        'New Releases',
        'Categories',
        'Deals',
      ],
    },
    {
      title: 'Support',
      links: ['Contact Us', 'FAQ', 'Shipping', 'Returns', 'Track Order'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Privacy Policy', 'Terms', 'Blog'],
    },
  ];
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Book<span className="text-emerald-500">Nest</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Your cozy corner for discovering great books. Curated with love,
              delivered with care.
            </p>
            <div className="flex gap-2 mt-5">
              {['𝕏', 'f', 'in', 'ig'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 text-sm font-bold transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © 2025 BookNest. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>📧 hello@booknest.com</span>
            <span>📞 +1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
