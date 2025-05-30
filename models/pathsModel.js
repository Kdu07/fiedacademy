// models/trilha.model.js
const supabase = require('../config/supabaseClient');

// Busca uma trilha e seus módulos
async function getTrilhaComModulos(idTrilha) {
  // Busca a trilha
  const { data: trilhaData, error: trilhaError } = await supabase
    .from('path')
    .select('id, title, description')
    .eq('id', idTrilha)
    .single();
  if (trilhaError) throw new Error(trilhaError.message);

  // Busca os módulos da trilha
  const { data: modulosData, error: modulosError } = await supabase
    .from('module')
    .select('id, title, order')
    .eq('id_path', idTrilha)
    .order('order', { ascending: true });
  if (modulosError) throw new Error(modulosError.message);

  // Monta o objeto no formato esperado pela view
  const trilha = {
    nome: trilhaData.title,
    descricao: trilhaData.description,
    modulos: modulosData.map(modulo => ({
      nome: modulo.title,
      progresso: 0, // Aqui você pode calcular o progresso real depois
      link: `/conteudo/${modulo.id}`
    }))
  };

  return trilha;
}

module.exports = { getTrilhaComModulos };

