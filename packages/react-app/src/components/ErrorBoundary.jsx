import React from "react";
import {
    Alert, Container,
} from "@mui/material";
import Troubleshhoting from "./Troubleshooting";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: undefined };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.    
        return { hasError: true, errorMessage: error.message ?? error.toString() };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service  
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {      // You can render any custom fallback UI   
            return (
                <Container maxWidth={"md"}>
                    <Alert severity="error">{this.state.errorMessage}</Alert>
                    <Troubleshhoting />
                </Container>
            )
        }
        return this.props.children;
    }
}