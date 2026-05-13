package com.CliniCare.CiliniCareApi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "anamnese_table")
public class Anamnese {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate data;
    private String resumo;
    private String textoCompleto;
    private String docPath;
    private LocalDateTime createdAt;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @Transient
    @JsonProperty("patientId")
    private Long patientIdInput;

    @Transient
    @JsonProperty("userId")
    private Long userIdInput;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonIgnore
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    // Section 1 - Identificação do paciente
    @Column(columnDefinition = "TEXT")
    private String medicamentos;
    @Column(columnDefinition = "TEXT")
    private String acompanhamentoProfissional;
    @Column(columnDefinition = "TEXT")
    private String cirurgiasPrevias;
    @Column(columnDefinition = "TEXT")
    private String deficienciaTranstorno;
    @Column(columnDefinition = "TEXT")
    private String nomeMae;
    private String idadeMae;
    @Column(columnDefinition = "TEXT")
    private String profissaoMae;
    @Column(columnDefinition = "TEXT")
    private String nomePai;
    private String idadePai;
    @Column(columnDefinition = "TEXT")
    private String profissaoPai;
    @Column(columnDefinition = "TEXT")
    private String responsavel;
    @Column(columnDefinition = "TEXT")
    private String irmaos;
    @Column(columnDefinition = "TEXT")
    private String quemMoraNaCasa;
    @Column(columnDefinition = "TEXT")
    private String escolaAnamnese;
    private String turnoEscolar;

    // Section 2 - Histórico da gestação
    @Column(columnDefinition = "TEXT")
    private String gravidezPlanejada;
    @Column(columnDefinition = "TEXT")
    private String usoBebidasAlcoolicas;
    @Column(columnDefinition = "TEXT")
    private String gestacaoParto;
    @Column(columnDefinition = "TEXT")
    private String usoMedicamentosGestacao;
    @Column(columnDefinition = "TEXT")
    private String idadeGravidez;
    @Column(columnDefinition = "TEXT")
    private String fezPreNatal;
    @Column(columnDefinition = "TEXT")
    private String partoPrematuro;
    @Column(columnDefinition = "TEXT")
    private String condicoesBebe;
    @Column(columnDefinition = "TEXT")
    private String partoProlongadoDuracao;
    @Column(columnDefinition = "TEXT")
    private String usouForceps;
    private String pontuacaoApgar;
    @Column(columnDefinition = "TEXT")
    private String triagemNeonatal;
    @Column(columnDefinition = "TEXT")
    private String bebeRecebeuVacinas;
    @Column(columnDefinition = "TEXT")
    private String problemaSaudeNascimento;

    // Section 3 - Histórico e desenvolvimento do bebê
    private String pesoBebe;
    private String tamanhoBebe;
    @Column(columnDefinition = "TEXT")
    private String alimentacaoPrimeirosMeses;
    @Column(columnDefinition = "TEXT")
    private String sonoPrimeirosMeses;
    @Column(columnDefinition = "TEXT")
    private String interacaoAmbiente;
    @Column(columnDefinition = "TEXT")
    private String contatoVisual;
    @Column(columnDefinition = "TEXT")
    private String sorria;
    @Column(columnDefinition = "TEXT")
    private String deitarRolar;
    @Column(columnDefinition = "TEXT")
    private String inicioEngatinhar;
    @Column(columnDefinition = "TEXT")
    private String inicioRodar;
    @Column(columnDefinition = "TEXT")
    private String inicioSentar;
    @Column(columnDefinition = "TEXT")
    private String inicioAndar;

    // Section 4 - Linguagem e comunicação
    @Column(columnDefinition = "TEXT")
    private String primeiraspalavras;
    @Column(columnDefinition = "TEXT")
    private String primeirasFrases;
    @Column(columnDefinition = "TEXT")
    private String quandoApontou;
    @Column(columnDefinition = "TEXT")
    private String alimentacaoBebeCrianca;
    private String tipoBebe;

    // Section 5 - Ambiente escolar e social
    @Column(columnDefinition = "TEXT")
    private String comportamentoCasa;
    @Column(columnDefinition = "TEXT")
    private String comunidade;
    @Column(columnDefinition = "TEXT")
    private String possuiRelatorioEscola;
    @Column(columnDefinition = "TEXT")
    private String possuiPdi;
    @Column(columnDefinition = "TEXT")
    private String interesseAtividades;
    @Column(columnDefinition = "TEXT")
    private String lidaComRegras;
    @Column(columnDefinition = "TEXT")
    private String pontuacaoProfessora;
    @Column(columnDefinition = "TEXT")
    private String habilidadesMotFinas;
    @Column(columnDefinition = "TEXT")
    private String habilidadesMotGrossas;

    // Section 6 - Acompanhamento
    @Column(columnDefinition = "TEXT")
    private String fazAcompanhamento;

    // Section 7 - Cognição/aprendizagem
    @Column(columnDefinition = "TEXT")
    private String memoria;
    @Column(columnDefinition = "TEXT")
    private String atencao;
    @Column(columnDefinition = "TEXT")
    private String compreensao;
    @Column(columnDefinition = "TEXT")
    private String linguagemCognicao;

    // Section 8 - Potencialidades e déficits
    @Column(columnDefinition = "TEXT")
    private String desafios;
    @Column(columnDefinition = "TEXT")
    private String potencialidades;

    // Section 9 - Socialização
    @Column(columnDefinition = "TEXT")
    private String pessoaQueSeIdentifica;
    @Column(columnDefinition = "TEXT")
    private String brincaComCriancas;
    @Column(columnDefinition = "TEXT")
    private String preferenciaBrinquedos;
    @Column(columnDefinition = "TEXT")
    private String sonoAtual;
    @Column(columnDefinition = "TEXT")
    private String atividadesVidaDiaria;
    @Column(columnDefinition = "TEXT")
    private String oQueFazPede;
    @Column(columnDefinition = "TEXT")
    private String rotinaCuidados;
    @Column(columnDefinition = "TEXT")
    private String tempoTela;
    @Column(columnDefinition = "TEXT")
    private String rendaFamiliar;
    @Column(columnDefinition = "TEXT")
    private String relacaoFamiliar;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPatientIdInput() { return patientIdInput; }
    public void setPatientIdInput(Long patientIdInput) { this.patientIdInput = patientIdInput; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public String getResumo() { return resumo; }
    public void setResumo(String resumo) { this.resumo = resumo; }

    public String getTextoCompleto() { return textoCompleto; }
    public void setTextoCompleto(String textoCompleto) { this.textoCompleto = textoCompleto; }

    public String getDocPath() { return docPath; }
    public void setDocPath(String docPath) { this.docPath = docPath; }

    public Long getUserIdInput() { return userIdInput; }
    public void setUserIdInput(Long userIdInput) { this.userIdInput = userIdInput; }

    @JsonIgnore
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    @JsonIgnore
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public String getMedicamentos() { return medicamentos; }
    public void setMedicamentos(String medicamentos) { this.medicamentos = medicamentos; }

    public String getAcompanhamentoProfissional() { return acompanhamentoProfissional; }
    public void setAcompanhamentoProfissional(String acompanhamentoProfissional) { this.acompanhamentoProfissional = acompanhamentoProfissional; }

    public String getCirurgiasPrevias() { return cirurgiasPrevias; }
    public void setCirurgiasPrevias(String cirurgiasPrevias) { this.cirurgiasPrevias = cirurgiasPrevias; }

    public String getDeficienciaTranstorno() { return deficienciaTranstorno; }
    public void setDeficienciaTranstorno(String deficienciaTranstorno) { this.deficienciaTranstorno = deficienciaTranstorno; }

    public String getNomeMae() { return nomeMae; }
    public void setNomeMae(String nomeMae) { this.nomeMae = nomeMae; }

    public String getIdadeMae() { return idadeMae; }
    public void setIdadeMae(String idadeMae) { this.idadeMae = idadeMae; }

    public String getProfissaoMae() { return profissaoMae; }
    public void setProfissaoMae(String profissaoMae) { this.profissaoMae = profissaoMae; }

    public String getNomePai() { return nomePai; }
    public void setNomePai(String nomePai) { this.nomePai = nomePai; }

    public String getIdadePai() { return idadePai; }
    public void setIdadePai(String idadePai) { this.idadePai = idadePai; }

    public String getProfissaoPai() { return profissaoPai; }
    public void setProfissaoPai(String profissaoPai) { this.profissaoPai = profissaoPai; }

    public String getResponsavel() { return responsavel; }
    public void setResponsavel(String responsavel) { this.responsavel = responsavel; }

    public String getIrmaos() { return irmaos; }
    public void setIrmaos(String irmaos) { this.irmaos = irmaos; }

    public String getQuemMoraNaCasa() { return quemMoraNaCasa; }
    public void setQuemMoraNaCasa(String quemMoraNaCasa) { this.quemMoraNaCasa = quemMoraNaCasa; }

    public String getEscolaAnamnese() { return escolaAnamnese; }
    public void setEscolaAnamnese(String escolaAnamnese) { this.escolaAnamnese = escolaAnamnese; }

    public String getTurnoEscolar() { return turnoEscolar; }
    public void setTurnoEscolar(String turnoEscolar) { this.turnoEscolar = turnoEscolar; }

    public String getGravidezPlanejada() { return gravidezPlanejada; }
    public void setGravidezPlanejada(String gravidezPlanejada) { this.gravidezPlanejada = gravidezPlanejada; }

    public String getUsoBebidasAlcoolicas() { return usoBebidasAlcoolicas; }
    public void setUsoBebidasAlcoolicas(String usoBebidasAlcoolicas) { this.usoBebidasAlcoolicas = usoBebidasAlcoolicas; }

    public String getGestacaoParto() { return gestacaoParto; }
    public void setGestacaoParto(String gestacaoParto) { this.gestacaoParto = gestacaoParto; }

    public String getUsoMedicamentosGestacao() { return usoMedicamentosGestacao; }
    public void setUsoMedicamentosGestacao(String usoMedicamentosGestacao) { this.usoMedicamentosGestacao = usoMedicamentosGestacao; }

    public String getIdadeGravidez() { return idadeGravidez; }
    public void setIdadeGravidez(String idadeGravidez) { this.idadeGravidez = idadeGravidez; }

    public String getFezPreNatal() { return fezPreNatal; }
    public void setFezPreNatal(String fezPreNatal) { this.fezPreNatal = fezPreNatal; }

    public String getPartoPrematuro() { return partoPrematuro; }
    public void setPartoPrematuro(String partoPrematuro) { this.partoPrematuro = partoPrematuro; }

    public String getCondicoesBebe() { return condicoesBebe; }
    public void setCondicoesBebe(String condicoesBebe) { this.condicoesBebe = condicoesBebe; }

    public String getPartoProlongadoDuracao() { return partoProlongadoDuracao; }
    public void setPartoProlongadoDuracao(String partoProlongadoDuracao) { this.partoProlongadoDuracao = partoProlongadoDuracao; }

    public String getUsouForceps() { return usouForceps; }
    public void setUsouForceps(String usouForceps) { this.usouForceps = usouForceps; }

    public String getPontuacaoApgar() { return pontuacaoApgar; }
    public void setPontuacaoApgar(String pontuacaoApgar) { this.pontuacaoApgar = pontuacaoApgar; }

    public String getTriagemNeonatal() { return triagemNeonatal; }
    public void setTriagemNeonatal(String triagemNeonatal) { this.triagemNeonatal = triagemNeonatal; }

    public String getBebeRecebeuVacinas() { return bebeRecebeuVacinas; }
    public void setBebeRecebeuVacinas(String bebeRecebeuVacinas) { this.bebeRecebeuVacinas = bebeRecebeuVacinas; }

    public String getProblemaSaudeNascimento() { return problemaSaudeNascimento; }
    public void setProblemaSaudeNascimento(String problemaSaudeNascimento) { this.problemaSaudeNascimento = problemaSaudeNascimento; }

    public String getPesoBebe() { return pesoBebe; }
    public void setPesoBebe(String pesoBebe) { this.pesoBebe = pesoBebe; }

    public String getTamanhoBebe() { return tamanhoBebe; }
    public void setTamanhoBebe(String tamanhoBebe) { this.tamanhoBebe = tamanhoBebe; }

    public String getAlimentacaoPrimeirosMeses() { return alimentacaoPrimeirosMeses; }
    public void setAlimentacaoPrimeirosMeses(String alimentacaoPrimeirosMeses) { this.alimentacaoPrimeirosMeses = alimentacaoPrimeirosMeses; }

    public String getSonoPrimeirosMeses() { return sonoPrimeirosMeses; }
    public void setSonoPrimeirosMeses(String sonoPrimeirosMeses) { this.sonoPrimeirosMeses = sonoPrimeirosMeses; }

    public String getInteracaoAmbiente() { return interacaoAmbiente; }
    public void setInteracaoAmbiente(String interacaoAmbiente) { this.interacaoAmbiente = interacaoAmbiente; }

    public String getContatoVisual() { return contatoVisual; }
    public void setContatoVisual(String contatoVisual) { this.contatoVisual = contatoVisual; }

    public String getSorria() { return sorria; }
    public void setSorria(String sorria) { this.sorria = sorria; }

    public String getDeitarRolar() { return deitarRolar; }
    public void setDeitarRolar(String deitarRolar) { this.deitarRolar = deitarRolar; }

    public String getInicioEngatinhar() { return inicioEngatinhar; }
    public void setInicioEngatinhar(String inicioEngatinhar) { this.inicioEngatinhar = inicioEngatinhar; }

    public String getInicioRodar() { return inicioRodar; }
    public void setInicioRodar(String inicioRodar) { this.inicioRodar = inicioRodar; }

    public String getInicioSentar() { return inicioSentar; }
    public void setInicioSentar(String inicioSentar) { this.inicioSentar = inicioSentar; }

    public String getInicioAndar() { return inicioAndar; }
    public void setInicioAndar(String inicioAndar) { this.inicioAndar = inicioAndar; }

    public String getPrimeiraspalavras() { return primeiraspalavras; }
    public void setPrimeiraspalavras(String primeiraspalavras) { this.primeiraspalavras = primeiraspalavras; }

    public String getPrimeirasFrases() { return primeirasFrases; }
    public void setPrimeirasFrases(String primeirasFrases) { this.primeirasFrases = primeirasFrases; }

    public String getQuandoApontou() { return quandoApontou; }
    public void setQuandoApontou(String quandoApontou) { this.quandoApontou = quandoApontou; }

    public String getAlimentacaoBebeCrianca() { return alimentacaoBebeCrianca; }
    public void setAlimentacaoBebeCrianca(String alimentacaoBebeCrianca) { this.alimentacaoBebeCrianca = alimentacaoBebeCrianca; }

    public String getTipoBebe() { return tipoBebe; }
    public void setTipoBebe(String tipoBebe) { this.tipoBebe = tipoBebe; }

    public String getComportamentoCasa() { return comportamentoCasa; }
    public void setComportamentoCasa(String comportamentoCasa) { this.comportamentoCasa = comportamentoCasa; }

    public String getComunidade() { return comunidade; }
    public void setComunidade(String comunidade) { this.comunidade = comunidade; }

    public String getPossuiRelatorioEscola() { return possuiRelatorioEscola; }
    public void setPossuiRelatorioEscola(String possuiRelatorioEscola) { this.possuiRelatorioEscola = possuiRelatorioEscola; }

    public String getPossuiPdi() { return possuiPdi; }
    public void setPossuiPdi(String possuiPdi) { this.possuiPdi = possuiPdi; }

    public String getInteresseAtividades() { return interesseAtividades; }
    public void setInteresseAtividades(String interesseAtividades) { this.interesseAtividades = interesseAtividades; }

    public String getLidaComRegras() { return lidaComRegras; }
    public void setLidaComRegras(String lidaComRegras) { this.lidaComRegras = lidaComRegras; }

    public String getPontuacaoProfessora() { return pontuacaoProfessora; }
    public void setPontuacaoProfessora(String pontuacaoProfessora) { this.pontuacaoProfessora = pontuacaoProfessora; }

    public String getHabilidadesMotFinas() { return habilidadesMotFinas; }
    public void setHabilidadesMotFinas(String habilidadesMotFinas) { this.habilidadesMotFinas = habilidadesMotFinas; }

    public String getHabilidadesMotGrossas() { return habilidadesMotGrossas; }
    public void setHabilidadesMotGrossas(String habilidadesMotGrossas) { this.habilidadesMotGrossas = habilidadesMotGrossas; }

    public String getFazAcompanhamento() { return fazAcompanhamento; }
    public void setFazAcompanhamento(String fazAcompanhamento) { this.fazAcompanhamento = fazAcompanhamento; }

    public String getMemoria() { return memoria; }
    public void setMemoria(String memoria) { this.memoria = memoria; }

    public String getAtencao() { return atencao; }
    public void setAtencao(String atencao) { this.atencao = atencao; }

    public String getCompreensao() { return compreensao; }
    public void setCompreensao(String compreensao) { this.compreensao = compreensao; }

    public String getLinguagemCognicao() { return linguagemCognicao; }
    public void setLinguagemCognicao(String linguagemCognicao) { this.linguagemCognicao = linguagemCognicao; }

    public String getDesafios() { return desafios; }
    public void setDesafios(String desafios) { this.desafios = desafios; }

    public String getPotencialidades() { return potencialidades; }
    public void setPotencialidades(String potencialidades) { this.potencialidades = potencialidades; }

    public String getPessoaQueSeIdentifica() { return pessoaQueSeIdentifica; }
    public void setPessoaQueSeIdentifica(String pessoaQueSeIdentifica) { this.pessoaQueSeIdentifica = pessoaQueSeIdentifica; }

    public String getBrincaComCriancas() { return brincaComCriancas; }
    public void setBrincaComCriancas(String brincaComCriancas) { this.brincaComCriancas = brincaComCriancas; }

    public String getPreferenciaBrinquedos() { return preferenciaBrinquedos; }
    public void setPreferenciaBrinquedos(String preferenciaBrinquedos) { this.preferenciaBrinquedos = preferenciaBrinquedos; }

    public String getSonoAtual() { return sonoAtual; }
    public void setSonoAtual(String sonoAtual) { this.sonoAtual = sonoAtual; }

    public String getAtividadesVidaDiaria() { return atividadesVidaDiaria; }
    public void setAtividadesVidaDiaria(String atividadesVidaDiaria) { this.atividadesVidaDiaria = atividadesVidaDiaria; }

    public String getOQueFazPede() { return oQueFazPede; }
    public void setOQueFazPede(String oQueFazPede) { this.oQueFazPede = oQueFazPede; }

    public String getRotinaCuidados() { return rotinaCuidados; }
    public void setRotinaCuidados(String rotinaCuidados) { this.rotinaCuidados = rotinaCuidados; }

    public String getTempoTela() { return tempoTela; }
    public void setTempoTela(String tempoTela) { this.tempoTela = tempoTela; }

    public String getRendaFamiliar() { return rendaFamiliar; }
    public void setRendaFamiliar(String rendaFamiliar) { this.rendaFamiliar = rendaFamiliar; }

    public String getRelacaoFamiliar() { return relacaoFamiliar; }
    public void setRelacaoFamiliar(String relacaoFamiliar) { this.relacaoFamiliar = relacaoFamiliar; }
}
