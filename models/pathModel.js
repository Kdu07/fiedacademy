// models/trilha.model.js
const supabase = require('../config/db');

// Busca uma trilha e seus módulos
async function getPathWithModules(pathId) {
  // Busca a trilha
  const { data: pathDate, error: pathError } = await supabase
    .from('path')
    .select('id, title, description')
    .eq('id', pathId)
    .single();
  if (pathError) throw new Error(pathError.message);

  // Busca os módulos da trilha
  const { data: moduleDate, error: moduleError } = await supabase
    .from('module')
    .select('id, title, order')
    .eq('id_path', pathId)
    .order('order', { ascending: true });
  if (moduleError) throw new Error(moduleError.message);

  // Monta o objeto no formato esperado pela view
  const path = {
    name: pathDate.title,
    description: pathDate.description,
    modules: moduleDate.map(module => ({
      name: module.title,
      progresso: 0, // Calcular o progresso real depois
      link: `/content/${module.id}`
    }))
  };

  return path;
}

module.exports = { getPathWithModules };

