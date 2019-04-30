import styled from 'styled-components'

export const ImageQuestion = styled.img`
    width: 50%;
    height: 'auto';
@media (min-width: 700px) {
    max-width: 20%;
    height: 'auto';
  }

`
export const textCounter = {
  textAlign:"left", fontSize:12,  fontStyle:"italic" 
}

export const styles = (theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.primary,
      backgroundColor: '#fff'
    },
    paperHov: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.primary,
      backgroundColor: '#b0bec5',
    },
    answeredColor:{
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.primary,
      backgroundColor: '#b0bec5',
    },
    answeredColorCorr:{
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.primary,
      backgroundColor: '#558b2f',
    },
    answeredColorWrong:{
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: '#fff',
      backgroundColor: '#b71c1c',
    }
    
  });
  