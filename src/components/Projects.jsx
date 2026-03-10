import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { projects } from '../data/projects';
import { certificates } from '../data/certificates';

const Projects = ({ activeTab }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="wait">
        {activeTab === "Projects" ? (
          <>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-cyan-400/50 transition-all duration-500 shadow-lg hover:shadow-cyan-500/20"
                whileHover={{ y: -8 }}
              >
                {project.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 shadow-lg">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 hover:bg-cyan-400/20 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3 mt-4">
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-lg text-center text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30">
                        <FaExternalLinkAlt className="text-xs" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                        className="flex-1 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg text-center text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-slate-700/50">
                        <FaGithub className="text-base" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-emerald-500/0 group-hover:from-cyan-500/5 group-hover:to-emerald-500/5 transition-all duration-500 pointer-events-none rounded-2xl"></div>
              </motion.div>
            ))}
          </>
        ) : (
          <>
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-cyan-400/50 transition-all duration-500 shadow-lg hover:shadow-cyan-500/20"
                whileHover={{ y: -8 }}
              >
                {cert.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                  </div>
                )}
                <div className="p-6">
                  {cert.issuer && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 text-cyan-300 border border-cyan-400/30">
                        🏛️ {cert.issuer}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  {cert.issue_date && (
                    <p className="text-slate-500 text-xs mb-4 flex items-center gap-1">
                      📅 {new Date(cert.issue_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  )}
                  <div className="flex gap-3 mt-4">
                    {cert.credential_url && (
                      <a href={cert.credential_url} target="_blank" rel="noopener noreferrer"
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-lg text-center text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30">
                        <FaExternalLinkAlt className="text-xs" />
                        <span>View Certificate</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-emerald-500/0 group-hover:from-cyan-500/5 group-hover:to-emerald-500/5 transition-all duration-500 pointer-events-none rounded-2xl"></div>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;