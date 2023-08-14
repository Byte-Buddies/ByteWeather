import {
		SecretsManagerClient,
		GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "ByteWeather-API_KEY";

const client = new SecretsManagerClient({
		region: "us-east-1",
});

export const config = async () => {
		try {
				const response = await client.send(
						new GetSecretValueCommand({
								SecretId: secret_name,
								VersionStage: "AWSCURRENT",
						})
				);
				return response.SecretString;
		} catch (error) {
				console.log("unable to fetch api key")
				throw error;
		}
};