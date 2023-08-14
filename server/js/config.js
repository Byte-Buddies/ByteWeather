import {
		SecretsManagerClient,
		GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
		region: "us-east-1",
});

export const config = async () => {
		try {
				const response = await client.send(
						new GetSecretValueCommand({
								SecretId: "ByteWeather-API_KEY",
								VersionStage: "AWSCURRENT",
						})
				);
				return response.SecretString;
		} catch (error) {
				console.log("unable to fetch api key")
				throw error;
		}
};