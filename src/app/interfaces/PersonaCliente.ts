export interface PersonaCedula {
    id_persona: number;
    id_tipo_identificacion: number;   
    fecha_expedicion_documento: string;
}

export interface InfoPersonalPersona {
    id_persona: string;
    id_tipo_identificacion: number;
    nombre: string;
    apellidos: string;
    fecha_nacimiento: Date;
    id_genero: number;
}

export interface ClienteInfo{
    celular: string;
    correo: string;
}  

export interface RespuestaPersona{
    id_persona: number;
    msg: string;
}

export interface InformacionCompletaFinal{
    hospital: string;
    clase_rc_medico: {
        valor_rc: string
        clase_medico:{
            nombre_clase: string;
        }
        rc_medico:{
            numero_rc_medico: string;
        }
    }
    especialidad_medico:{
        nombre_especialidad: string;
    }
    ciudad:{
        nombre_ciudad: string;
        departamento: string;
    }
    poliza:{
        valor_cotizacion: string;
        cliente:{
            correo: string;
            celular: string;
            persona:{
                id_persona: string;
                nombre: string;
                apellidos: string;
                fecha_expedicion_documento: Date;
            }
        }
    }
}

export interface InformacionUrl{
    url: string;
}

export interface RespuestaUrl{
    id_poliza_medico: number;
}
