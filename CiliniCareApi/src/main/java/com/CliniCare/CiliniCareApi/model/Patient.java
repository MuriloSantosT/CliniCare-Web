package com.CliniCare.CiliniCareApi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "patient_table")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cpf;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;
    private String sexo;
    private String alergias;
    private String convenio;
    private String telefoneEmergencia;
    private String observacoesGerais;
    private String nomeEscola;
    private String telefoneEscola;
    private String ano;
    private String periodo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String rua;
    private String numero;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;
    private String complemento;
    private String nomeMae;
    private String idadeMae;
    private String profissaoMae;
    private String nomePai;
    private String idadePai;
    private String profissaoPai;

    // Histórico de Gestação
    private String gravidezPlanejada;
    private String usoBebidasAlcoolicas;
    private String gestacaoParto;
    private String usoMedicamentosGestacao;
    private String idadeGravidez;
    private String fezPreNatal;
    private String partoPrematuro;
    private String condicoesBebe;
    private String duracaoParto;
    private String usouForceps;
    private String pontuacaoApgar;
    private String triagemNeonatal;
    private String bebeRecebeuVacinas;
    private String problemaSaudeNascimento;

    // Histórico e Desenvolvimento do Bebê
    private String pesoBebe;
    private String tamanhoBebe;
    private String alimentacaoPrimeirosMeses;
    private String sonoPrimeirosMeses;
    private String interacaoAmbiente;
    private String contatoVisual;
    private String sorria;
    private String deitava;
    private String inicioEngatinhar;
    private String inicioRodar;
    private String inicioSentar;
    private String inicioAndar;

    // Linguagem e Comunicação
    private String primeiraspalavras;
    private String primeirasFrases;
    private String quandoApontou;
    private String alimentacaoBebeCrianca;
    private String tipoBebe;

    // Ambiente Escolar e Social
    private String comportamentoCasa;
    private String comunidade;
    private String possuiRelatorioEscola;
    private String possuiPdi;
    private String interesseAtividades;
    private String lidaComRegras;
    private String pontuacaoProfessora;
    private String habilidadesMotFinas;
    private String habilidadesMotGrossas;

    // Cognição
    private String memoria;
    private String atencao;
    private String compreensao;
    private String linguagemCognicao;

    // Potencialidades e Déficits
    private String desafios;
    private String potencialidades;

    // Socialização
    private String pessoaQueSeIdentifica;
    private String brincaComCriancas;
    private String preferenciaBrinquedos;
    private String sonoAtual;
    private String atividadesVidaDiaria;
    private String oQueFazPede;
    private String rotinaCuidados;
    private String tempoTela;
    private String rendaFamiliar;
    private String relacaoFamiliar;
    private String observacoes;

    // Informações Médicas
    private String medicamentos;
    private String acompanhamentoProfissional;
    private String cirurgiasPrevias;
    private String deficienciaTranstorno;

    public Patient() {
    }

    @JsonIgnore
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Report> reports;

    @JsonIgnore
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<PatientContact> contatos;

    @Transient
    @JsonProperty("userId")
    private Long userIdInput;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Guardian> responsaveis;

    @JsonIgnore
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> consultas;

    @JsonIgnore
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Anamnese> anamneses;

    @JsonIgnore
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Evolution> evolucoes;

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getAlergias() {
        return alergias;
    }

    public void setAlergias(String alergias) {
        this.alergias = alergias;
    }

    public String getConvenio() {
        return convenio;
    }

    public void setConvenio(String convenio) {
        this.convenio = convenio;
    }

    public String getTelefoneEmergencia() {
        return telefoneEmergencia;
    }

    public void setTelefoneEmergencia(String telefoneEmergencia) {
        this.telefoneEmergencia = telefoneEmergencia;
    }

    public String getObservacoesGerais() {
        return observacoesGerais;
    }

    public void setObservacoesGerais(String observacoesGerais) {
        this.observacoesGerais = observacoesGerais;
    }

    public String getNomeEscola() {
        return nomeEscola;
    }

    public void setNomeEscola(String nomeEscola) {
        this.nomeEscola = nomeEscola;
    }

    public String getTelefoneEscola() {
        return telefoneEscola;
    }

    public void setTelefoneEscola(String telefoneEscola) {
        this.telefoneEscola = telefoneEscola;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<PatientContact> getContatos() {
        return contatos;
    }

    public void setContatos(List<PatientContact> contatos) {
        this.contatos = contatos;
    }

    public Long getUserIdInput() {
        return userIdInput;
    }

    public void setUserIdInput(Long userIdInput) {
        this.userIdInput = userIdInput;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Guardian> getResponsaveis() {
        return responsaveis;
    }

    public void setResponsaveis(List<Guardian> responsaveis) {
        this.responsaveis = responsaveis;
    }

    public List<Appointment> getConsultas() {
        return consultas;
    }

    public void setConsultas(List<Appointment> consultas) {
        this.consultas = consultas;
    }

    public List<Anamnese> getAnamneses() {
        return anamneses;
    }

    public void setAnamneses(List<Anamnese> anamneses) {
        this.anamneses = anamneses;
    }

    public List<Evolution> getEvolucoes() {
        return evolucoes;
    }

    public void setEvolucoes(List<Evolution> evolucoes) {
        this.evolucoes = evolucoes;
    }

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

    // Histórico de Gestação
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

    public String getDuracaoParto() { return duracaoParto; }
    public void setDuracaoParto(String duracaoParto) { this.duracaoParto = duracaoParto; }

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

    // Histórico e Desenvolvimento do Bebê
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

    public String getDeitava() { return deitava; }
    public void setDeitava(String deitava) { this.deitava = deitava; }

    public String getInicioEngatinhar() { return inicioEngatinhar; }
    public void setInicioEngatinhar(String inicioEngatinhar) { this.inicioEngatinhar = inicioEngatinhar; }

    public String getInicioRodar() { return inicioRodar; }
    public void setInicioRodar(String inicioRodar) { this.inicioRodar = inicioRodar; }

    public String getInicioSentar() { return inicioSentar; }
    public void setInicioSentar(String inicioSentar) { this.inicioSentar = inicioSentar; }

    public String getInicioAndar() { return inicioAndar; }
    public void setInicioAndar(String inicioAndar) { this.inicioAndar = inicioAndar; }

    // Linguagem e Comunicação
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

    // Ambiente Escolar e Social
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

    // Cognição
    public String getMemoria() { return memoria; }
    public void setMemoria(String memoria) { this.memoria = memoria; }

    public String getAtencao() { return atencao; }
    public void setAtencao(String atencao) { this.atencao = atencao; }

    public String getCompreensao() { return compreensao; }
    public void setCompreensao(String compreensao) { this.compreensao = compreensao; }

    public String getLinguagemCognicao() { return linguagemCognicao; }
    public void setLinguagemCognicao(String linguagemCognicao) { this.linguagemCognicao = linguagemCognicao; }

    // Potencialidades e Déficits
    public String getDesafios() { return desafios; }
    public void setDesafios(String desafios) { this.desafios = desafios; }

    public String getPotencialidades() { return potencialidades; }
    public void setPotencialidades(String potencialidades) { this.potencialidades = potencialidades; }

    // Socialização
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

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    // Informações Médicas
    public String getMedicamentos() { return medicamentos; }
    public void setMedicamentos(String medicamentos) { this.medicamentos = medicamentos; }

    public String getAcompanhamentoProfissional() { return acompanhamentoProfissional; }
    public void setAcompanhamentoProfissional(String acompanhamentoProfissional) { this.acompanhamentoProfissional = acompanhamentoProfissional; }

    public String getCirurgiasPrevias() { return cirurgiasPrevias; }
    public void setCirurgiasPrevias(String cirurgiasPrevias) { this.cirurgiasPrevias = cirurgiasPrevias; }

    public String getDeficienciaTranstorno() { return deficienciaTranstorno; }
    public void setDeficienciaTranstorno(String deficienciaTranstorno) { this.deficienciaTranstorno = deficienciaTranstorno; }
}
