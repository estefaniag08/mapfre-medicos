export interface EspecialidadMedico{
    id_especialidad_medico: string;
    nombre_especialidad: string;
}

export interface RCMedico{
    id_clase_rc_medico: number;
    valor_rc: string;
    rc_medico:{
        id_rc_medico: number;
        numero_rc_medico: string;
    }
}

export interface ClaseMedico{
    id_clase_por_especialidad: number;
    clase_medico:{
        id_clase_medico: number;
        nombre_clase: string;
        numero_clase: number;
    }
}

export interface InformacionCotizacionMedico{
    hospital: string;
    id_clase_rc: number;
    id_especialidad: number;
    id_ciudad: number;
    direccion: string;
}

export interface RespuestaPolizaMedico{
    msg: string;
    id_poliza_medico: number;
}

export interface SarlafPreguntas{
    pregunta_1: boolean;
    pregunta_2: boolean;
    pregunta_3: boolean;
    pregunta_4: boolean;
    pregunta_5: boolean;
    pregunta_6: boolean;
    pregunta_7: boolean;
}