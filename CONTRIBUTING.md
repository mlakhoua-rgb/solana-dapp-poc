# Contributing to Solana dApp PoC

Thank you for your interest in contributing to this AI-augmented Web3 application! This repository demonstrates how experienced technical leaders orchestrate AI agents for blockchain development while maintaining human governance.

## How to Contribute

### Reporting Issues

If you find a bug, security vulnerability, or have a feature request:

1. Check if the issue already exists in the [Issues](https://github.com/mlakhoua-rgb/solana-dapp-poc/issues) section
2. If not, create a new issue with a clear title and description
3. Include relevant details: browser, wallet version, error messages, transaction signatures, etc.
4. For security vulnerabilities, please email directly rather than creating a public issue

### Suggesting Enhancements

We welcome suggestions for improving this AI-augmented Web3 demonstration:

- New Solana features or integrations
- Enhanced wallet support
- Improved UI/UX
- Better testing coverage
- Performance optimizations
- Documentation improvements

Please open an issue with the `enhancement` label to discuss your ideas.

### Pull Requests

We appreciate pull requests that improve the application code, documentation, or AI-augmented development practices.

**Before submitting a PR:**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies: `pnpm install`
4. Make your changes following our coding standards
5. Write or update tests for your changes
6. Run tests: `pnpm test`
7. Run linting: `pnpm lint`
8. Run formatting: `pnpm format`
9. Build the application: `pnpm build`
10. Update documentation if needed
11. Commit with clear, descriptive messages
12. Push to your fork and submit a pull request

**PR Guidelines:**

- Keep changes focused and atomic
- Include a clear description of what and why
- Reference related issues if applicable
- Ensure all tests pass
- Maintain or improve test coverage
- Be responsive to review feedback

### Coding Standards

**TypeScript/React Code:**

- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use functional components
- Implement proper error handling
- Add JSDoc comments for complex functions
- Use meaningful variable and function names
- Keep components small and focused

**Testing:**

- Write unit tests for components
- Test blockchain interactions with mocks
- Aim for high test coverage
- Test edge cases and error scenarios
- Use React Testing Library best practices

**Styling:**

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design
- Test on multiple screen sizes
- Maintain accessibility standards (WCAG 2.1)

**Security:**

- Never commit private keys or sensitive data
- Validate all user inputs
- Implement proper wallet security
- Follow Solana security best practices
- Use secure transaction signing patterns

### AI-Augmented Development

This repository demonstrates AI-augmented Web3 development. When contributing:

- **Human Oversight Required:** All AI-generated code must be reviewed and validated by humans
- **Blockchain Governance:** Maintain human ownership of smart contract interactions and transaction validation
- **Security Validation:** AI-assisted security scanning must be human-reviewed
- **Testing:** Ensure AI-generated tests are comprehensive and accurate

### Testing

Before submitting changes:

1. Run the full test suite: `pnpm test`
2. Check test coverage: `pnpm test:coverage`
3. Test in browser with Phantom wallet
4. Test on Solana Devnet
5. Verify wallet connection and disconnection
6. Test transaction flows end-to-end

### Local Development

1. Clone your fork
2. Install dependencies: `pnpm install`
3. Start development server: `pnpm dev`
4. Connect Phantom wallet to Devnet
5. Get Devnet SOL from [Solana Faucet](https://faucet.solana.com/)
6. Test features locally

### Docker Development

1. Build Docker image: `docker-compose build`
2. Run container: `docker-compose up`
3. Access at http://localhost:3000

### Code Review Process

1. Maintainers will review PRs within 5 business days
2. Feedback will be provided for improvements
3. Once approved and tests pass, changes will be merged
4. Contributors will be acknowledged in release notes

### Community Guidelines

- Be respectful and constructive
- Focus on the code and ideas, not individuals
- Welcome newcomers and help them learn Web3
- Share knowledge about Solana development
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md) (if applicable)

### Questions?

If you have questions about contributing:

- Open a discussion in the [Discussions](https://github.com/mlakhoua-rgb/solana-dapp-poc/discussions) section
- Check existing documentation
- Review closed issues for similar questions
- Ask in Solana developer communities

## Development Resources

- [Solana Documentation](https://docs.solana.com/)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers this project.

---

**Thank you for contributing to AI-augmented Web3 development!**

This project demonstrates how experienced technical leaders can leverage AI agents as collaborators while maintaining human ownership of blockchain interactions and production environments.
