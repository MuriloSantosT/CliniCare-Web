package com.CliniCare.CiliniCareApi.service;

import com.CliniCare.CiliniCareApi.model.Anamnese;
import com.CliniCare.CiliniCareApi.model.Patient;
import com.CliniCare.CiliniCareApi.model.User;
import com.CliniCare.CiliniCareApi.repository.AnamneseRepository;
import com.CliniCare.CiliniCareApi.repository.PatientRepository;
import com.CliniCare.CiliniCareApi.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnamneseService {

    private final AnamneseRepository anamneseRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public AnamneseService(AnamneseRepository anamneseRepository, PatientRepository patientRepository, UserRepository userRepository) {
        this.anamneseRepository = anamneseRepository;
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    // Listar
    public List<Anamnese> getAll() {return anamneseRepository.findAll();}

    public List<Anamnese> listByPacient(Long patientId) {
        return anamneseRepository.findByPatientId(patientId);
    }

    public List<Anamnese> listByUser(Long userId) {
        return anamneseRepository.findByUserId(userId);
    }

    // Criar
    public Anamnese save(Anamnese anamnese) {
        if (anamnese.getPatientIdInput() != null) {
            Patient patient = patientRepository.findById(anamnese.getPatientIdInput())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Paciente não encontrado: " + anamnese.getPatientIdInput()));
            anamnese.setPatient(patient);
        }
        if (anamnese.getUserIdInput() != null) {
            User user = userRepository.findById(anamnese.getUserIdInput())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Usuário não encontrado: " + anamnese.getUserIdInput()));
            anamnese.setUser(user);
        }
        anamnese.setCreatedAt(LocalDateTime.now());
        return anamneseRepository.save(anamnese);
    }

    // Atualizar
    public Anamnese update(Long id, Anamnese updated) {
        Anamnese existing = anamneseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Anamnese não encontrada: " + id));
        existing.setData(updated.getData());
        existing.setResumo(updated.getResumo());
        existing.setTextoCompleto(updated.getTextoCompleto());
        existing.setObservacoes(updated.getObservacoes());
        existing.setMedicamentos(updated.getMedicamentos());
        existing.setAcompanhamentoProfissional(updated.getAcompanhamentoProfissional());
        existing.setCirurgiasPrevias(updated.getCirurgiasPrevias());
        existing.setDeficienciaTranstorno(updated.getDeficienciaTranstorno());
        existing.setNomeMae(updated.getNomeMae());
        existing.setIdadeMae(updated.getIdadeMae());
        existing.setProfissaoMae(updated.getProfissaoMae());
        existing.setNomePai(updated.getNomePai());
        existing.setIdadePai(updated.getIdadePai());
        existing.setProfissaoPai(updated.getProfissaoPai());
        existing.setResponsavel(updated.getResponsavel());
        existing.setIrmaos(updated.getIrmaos());
        existing.setQuemMoraNaCasa(updated.getQuemMoraNaCasa());
        existing.setEscolaAnamnese(updated.getEscolaAnamnese());
        existing.setTurnoEscolar(updated.getTurnoEscolar());
        existing.setGravidezPlanejada(updated.getGravidezPlanejada());
        existing.setUsoBebidasAlcoolicas(updated.getUsoBebidasAlcoolicas());
        existing.setGestacaoParto(updated.getGestacaoParto());
        existing.setUsoMedicamentosGestacao(updated.getUsoMedicamentosGestacao());
        existing.setIdadeGravidez(updated.getIdadeGravidez());
        existing.setFezPreNatal(updated.getFezPreNatal());
        existing.setPartoPrematuro(updated.getPartoPrematuro());
        existing.setCondicoesBebe(updated.getCondicoesBebe());
        existing.setPartoProlongadoDuracao(updated.getPartoProlongadoDuracao());
        existing.setUsouForceps(updated.getUsouForceps());
        existing.setPontuacaoApgar(updated.getPontuacaoApgar());
        existing.setTriagemNeonatal(updated.getTriagemNeonatal());
        existing.setBebeRecebeuVacinas(updated.getBebeRecebeuVacinas());
        existing.setProblemaSaudeNascimento(updated.getProblemaSaudeNascimento());
        existing.setPesoBebe(updated.getPesoBebe());
        existing.setTamanhoBebe(updated.getTamanhoBebe());
        existing.setAlimentacaoPrimeirosMeses(updated.getAlimentacaoPrimeirosMeses());
        existing.setSonoPrimeirosMeses(updated.getSonoPrimeirosMeses());
        existing.setInteracaoAmbiente(updated.getInteracaoAmbiente());
        existing.setContatoVisual(updated.getContatoVisual());
        existing.setSorria(updated.getSorria());
        existing.setDeitarRolar(updated.getDeitarRolar());
        existing.setInicioEngatinhar(updated.getInicioEngatinhar());
        existing.setInicioRodar(updated.getInicioRodar());
        existing.setInicioSentar(updated.getInicioSentar());
        existing.setInicioAndar(updated.getInicioAndar());
        existing.setPrimeiraspalavras(updated.getPrimeiraspalavras());
        existing.setPrimeirasFrases(updated.getPrimeirasFrases());
        existing.setQuandoApontou(updated.getQuandoApontou());
        existing.setAlimentacaoBebeCrianca(updated.getAlimentacaoBebeCrianca());
        existing.setTipoBebe(updated.getTipoBebe());
        existing.setComportamentoCasa(updated.getComportamentoCasa());
        existing.setComunidade(updated.getComunidade());
        existing.setPossuiRelatorioEscola(updated.getPossuiRelatorioEscola());
        existing.setPossuiPdi(updated.getPossuiPdi());
        existing.setInteresseAtividades(updated.getInteresseAtividades());
        existing.setLidaComRegras(updated.getLidaComRegras());
        existing.setPontuacaoProfessora(updated.getPontuacaoProfessora());
        existing.setHabilidadesMotFinas(updated.getHabilidadesMotFinas());
        existing.setHabilidadesMotGrossas(updated.getHabilidadesMotGrossas());
        existing.setFazAcompanhamento(updated.getFazAcompanhamento());
        existing.setMemoria(updated.getMemoria());
        existing.setAtencao(updated.getAtencao());
        existing.setCompreensao(updated.getCompreensao());
        existing.setLinguagemCognicao(updated.getLinguagemCognicao());
        existing.setDesafios(updated.getDesafios());
        existing.setPotencialidades(updated.getPotencialidades());
        existing.setPessoaQueSeIdentifica(updated.getPessoaQueSeIdentifica());
        existing.setBrincaComCriancas(updated.getBrincaComCriancas());
        existing.setPreferenciaBrinquedos(updated.getPreferenciaBrinquedos());
        existing.setSonoAtual(updated.getSonoAtual());
        existing.setAtividadesVidaDiaria(updated.getAtividadesVidaDiaria());
        existing.setOQueFazPede(updated.getOQueFazPede());
        existing.setRotinaCuidados(updated.getRotinaCuidados());
        existing.setTempoTela(updated.getTempoTela());
        existing.setRendaFamiliar(updated.getRendaFamiliar());
        existing.setRelacaoFamiliar(updated.getRelacaoFamiliar());
        return anamneseRepository.save(existing);
    }

    // Deletar
    public void delete(Long id) {anamneseRepository.deleteById(id);}
}
