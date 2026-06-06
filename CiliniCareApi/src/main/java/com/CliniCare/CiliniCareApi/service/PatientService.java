package com.CliniCare.CiliniCareApi.service;

import com.CliniCare.CiliniCareApi.model.Guardian;
import com.CliniCare.CiliniCareApi.model.Patient;
import com.CliniCare.CiliniCareApi.model.User;
import com.CliniCare.CiliniCareApi.repository.PatientRepository;
import com.CliniCare.CiliniCareApi.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientService(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // GET ALL
    // =========================
    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    public List<Patient> listByUser(Long userId) {
        return patientRepository.findByUserId(userId);
    }

    // =========================
    // GET BY ID
    // =========================
    public Patient getById(Long id, Long userId) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente não encontrado com ID: " + id));

        if (patient.getUser() == null || !Objects.equals(patient.getUser().getId(), userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Acesso negado: paciente pertence a outro profissional");
        }

        return patient;
    }

    private Patient findByIdInternal(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com ID: " + id));
    }

    // =========================
    // CREATE
    // =========================
    public Patient save(Patient patient) {
        try {
            patient.setCreatedAt(LocalDateTime.now());
            patient.setUpdatedAt(LocalDateTime.now());

            if (patient.getUserIdInput() != null) {
                User user = userRepository.findById(patient.getUserIdInput())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Usuário não encontrado: " + patient.getUserIdInput()));
                patient.setUser(user);
            }

            if (patient.getResponsaveis() != null) {
                for (Guardian guardian : patient.getResponsaveis()) {
                    guardian.setPatient(patient);
                }
            }

            return patientRepository.save(patient);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar paciente: " + e.getMessage(), e);
        }
    }

    // =========================
    // UPDATE BY ID
    // =========================
    public Patient updateById(Long id, Patient updatedPatient, Long userId) {

        Patient existingPatient = findByIdInternal(id);

        if (existingPatient.getUser() == null || !Objects.equals(existingPatient.getUser().getId(), userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Acesso negado: paciente pertence a outro profissional");
        }

        // =========================
        // Dados pessoais
        // =========================
        existingPatient.setNome(updatedPatient.getNome());
        existingPatient.setCpf(updatedPatient.getCpf());
        existingPatient.setDataNascimento(updatedPatient.getDataNascimento());
        existingPatient.setSexo(updatedPatient.getSexo());
        existingPatient.setAlergias(updatedPatient.getAlergias());
        existingPatient.setConvenio(updatedPatient.getConvenio());
        existingPatient.setTelefoneEmergencia(updatedPatient.getTelefoneEmergencia());
        existingPatient.setObservacoesGerais(updatedPatient.getObservacoesGerais());

        // =========================
        // Escola
        // =========================
        existingPatient.setNomeEscola(updatedPatient.getNomeEscola());
        existingPatient.setTelefoneEscola(updatedPatient.getTelefoneEscola());
        existingPatient.setAno(updatedPatient.getAno());
        existingPatient.setPeriodo(updatedPatient.getPeriodo());

        // =========================
        // Endereço
        // =========================
        existingPatient.setRua(updatedPatient.getRua());
        existingPatient.setNumero(updatedPatient.getNumero());
        existingPatient.setBairro(updatedPatient.getBairro());
        existingPatient.setCidade(updatedPatient.getCidade());
        existingPatient.setEstado(updatedPatient.getEstado());
        existingPatient.setCep(updatedPatient.getCep());
        existingPatient.setComplemento(updatedPatient.getComplemento());

        // =========================
        // Informações Médicas
        // =========================
        existingPatient.setMedicamentos(updatedPatient.getMedicamentos());
        existingPatient.setAcompanhamentoProfissional(updatedPatient.getAcompanhamentoProfissional());
        existingPatient.setCirurgiasPrevias(updatedPatient.getCirurgiasPrevias());
        existingPatient.setDeficienciaTranstorno(updatedPatient.getDeficienciaTranstorno());

        // =========================
        // Histórico de Gestação
        // =========================
        existingPatient.setGravidezPlanejada(updatedPatient.getGravidezPlanejada());
        existingPatient.setUsoBebidasAlcoolicas(updatedPatient.getUsoBebidasAlcoolicas());
        existingPatient.setGestacaoParto(updatedPatient.getGestacaoParto());
        existingPatient.setUsoMedicamentosGestacao(updatedPatient.getUsoMedicamentosGestacao());
        existingPatient.setIdadeGravidez(updatedPatient.getIdadeGravidez());
        existingPatient.setFezPreNatal(updatedPatient.getFezPreNatal());
        existingPatient.setPartoPrematuro(updatedPatient.getPartoPrematuro());
        existingPatient.setCondicoesBebe(updatedPatient.getCondicoesBebe());
        existingPatient.setDuracaoParto(updatedPatient.getDuracaoParto());
        existingPatient.setUsouForceps(updatedPatient.getUsouForceps());
        existingPatient.setPontuacaoApgar(updatedPatient.getPontuacaoApgar());
        existingPatient.setTriagemNeonatal(updatedPatient.getTriagemNeonatal());
        existingPatient.setBebeRecebeuVacinas(updatedPatient.getBebeRecebeuVacinas());
        existingPatient.setProblemaSaudeNascimento(updatedPatient.getProblemaSaudeNascimento());

        // =========================
        // Histórico e Desenvolvimento do Bebê
        // =========================
        existingPatient.setPesoBebe(updatedPatient.getPesoBebe());
        existingPatient.setTamanhoBebe(updatedPatient.getTamanhoBebe());
        existingPatient.setAlimentacaoPrimeirosMeses(updatedPatient.getAlimentacaoPrimeirosMeses());
        existingPatient.setSonoPrimeirosMeses(updatedPatient.getSonoPrimeirosMeses());
        existingPatient.setInteracaoAmbiente(updatedPatient.getInteracaoAmbiente());
        existingPatient.setContatoVisual(updatedPatient.getContatoVisual());
        existingPatient.setSorria(updatedPatient.getSorria());
        existingPatient.setDeitava(updatedPatient.getDeitava());
        existingPatient.setInicioEngatinhar(updatedPatient.getInicioEngatinhar());
        existingPatient.setInicioRodar(updatedPatient.getInicioRodar());
        existingPatient.setInicioSentar(updatedPatient.getInicioSentar());
        existingPatient.setInicioAndar(updatedPatient.getInicioAndar());

        // =========================
        // Linguagem e Comunicação
        // =========================
        existingPatient.setPrimeiraspalavras(updatedPatient.getPrimeiraspalavras());
        existingPatient.setPrimeirasFrases(updatedPatient.getPrimeirasFrases());
        existingPatient.setQuandoApontou(updatedPatient.getQuandoApontou());
        existingPatient.setAlimentacaoBebeCrianca(updatedPatient.getAlimentacaoBebeCrianca());
        existingPatient.setTipoBebe(updatedPatient.getTipoBebe());

        // =========================
        // Ambiente Escolar e Social
        // =========================
        existingPatient.setComportamentoCasa(updatedPatient.getComportamentoCasa());
        existingPatient.setComunidade(updatedPatient.getComunidade());
        existingPatient.setPossuiRelatorioEscola(updatedPatient.getPossuiRelatorioEscola());
        existingPatient.setPossuiPdi(updatedPatient.getPossuiPdi());
        existingPatient.setInteresseAtividades(updatedPatient.getInteresseAtividades());
        existingPatient.setLidaComRegras(updatedPatient.getLidaComRegras());
        existingPatient.setPontuacaoProfessora(updatedPatient.getPontuacaoProfessora());
        existingPatient.setHabilidadesMotFinas(updatedPatient.getHabilidadesMotFinas());
        existingPatient.setHabilidadesMotGrossas(updatedPatient.getHabilidadesMotGrossas());

        // =========================
        // Cognição
        // =========================
        existingPatient.setMemoria(updatedPatient.getMemoria());
        existingPatient.setAtencao(updatedPatient.getAtencao());
        existingPatient.setCompreensao(updatedPatient.getCompreensao());
        existingPatient.setLinguagemCognicao(updatedPatient.getLinguagemCognicao());

        // =========================
        // Potencialidades e Déficits
        // =========================
        existingPatient.setDesafios(updatedPatient.getDesafios());
        existingPatient.setPotencialidades(updatedPatient.getPotencialidades());

        // =========================
        // Socialização
        // =========================
        existingPatient.setPessoaQueSeIdentifica(updatedPatient.getPessoaQueSeIdentifica());
        existingPatient.setBrincaComCriancas(updatedPatient.getBrincaComCriancas());
        existingPatient.setPreferenciaBrinquedos(updatedPatient.getPreferenciaBrinquedos());
        existingPatient.setSonoAtual(updatedPatient.getSonoAtual());
        existingPatient.setAtividadesVidaDiaria(updatedPatient.getAtividadesVidaDiaria());
        existingPatient.setOQueFazPede(updatedPatient.getOQueFazPede());
        existingPatient.setRotinaCuidados(updatedPatient.getRotinaCuidados());
        existingPatient.setTempoTela(updatedPatient.getTempoTela());
        existingPatient.setRendaFamiliar(updatedPatient.getRendaFamiliar());
        existingPatient.setRelacaoFamiliar(updatedPatient.getRelacaoFamiliar());
        existingPatient.setObservacoes(updatedPatient.getObservacoes());

        // Atualiza dados dos pais
        existingPatient.setNomeMae(updatedPatient.getNomeMae());
        existingPatient.setIdadeMae(updatedPatient.getIdadeMae());
        existingPatient.setProfissaoMae(updatedPatient.getProfissaoMae());
        existingPatient.setNomePai(updatedPatient.getNomePai());
        existingPatient.setIdadePai(updatedPatient.getIdadePai());
        existingPatient.setProfissaoPai(updatedPatient.getProfissaoPai());

        // =========================
        // Atualização dos responsáveis
        // =========================
        if (updatedPatient.getResponsaveis() != null) {

            // Remove todos os antigos (orphanRemoval = true cuida do delete)
            existingPatient.getResponsaveis().clear();

            for (Guardian guardian : updatedPatient.getResponsaveis()) {
                guardian.setPatient(existingPatient);
                existingPatient.getResponsaveis().add(guardian);
            }
        }

        // Atualiza timestamp
        existingPatient.setUpdatedAt(LocalDateTime.now());

        return patientRepository.save(existingPatient);
    }

    // =========================
    // DELETE BY ID
    // =========================
    public void deleteById(Long id, Long userId) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com ID: " + id));

        if (patient.getUser() == null || !Objects.equals(patient.getUser().getId(), userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Acesso negado: paciente pertence a outro profissional");
        }

        patientRepository.deleteById(id);
    }
}