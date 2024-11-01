# Stage 1: Build React + Vite frontend
FROM node:20 AS frontend-build

WORKDIR /app

# Copy frontend dependencies
COPY Iffco.Malaysia.client/package.json Iffco.Malaysia.client/yarn.lock ./
RUN yarn install
RUN yarn add date-fns
RUN yarn add react-otp-input
# Copy and build the frontend application
COPY Iffco.Malaysia.client .
RUN yarn build


# Stage 2: Build .NET backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build

WORKDIR /app

# Copy and restore backend dependencies
COPY Iffco.Malaysia.Server/Iffco.Malaysia.Server.csproj Iffco.Malaysia.Server/

RUN dotnet restore Iffco.Malaysia.Server/Iffco.Malaysia.Server.csproj

# Copy the rest of the backend code
COPY Iffco.Malaysia.Server Iffco.Malaysia.Server


# Publish the backend application
RUN dotnet publish Iffco.Malaysia.Server/Iffco.Malaysia.Server.csproj -c Release -o /app/publish

# Stage 3: Final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app
EXPOSE 8080
EXPOSE 5173

# Copy built frontend and published backend into final image
COPY --from=frontend-build /app/dist wwwroot/
COPY --from=backend-build /app/publish .

ENTRYPOINT ["dotnet", "Iffco.Malaysia.Server.dll"]
